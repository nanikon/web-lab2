package ru.nanikon.second.servlet;

import ru.nanikon.second.dto.Answer;
import ru.nanikon.second.dto.Point;
import ru.nanikon.second.parser.AnswerJsonParser;
import ru.nanikon.second.service.AreaService;
import ru.nanikon.second.service.model.*;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Natalia Nikonova
 */
public class AreaCheckServlet extends HttpServlet {
    @Inject
    private AreaService areaService;
    @Inject
    private AnswerJsonParser parser;

    @PostConstruct
    public void configArea() {
        areaService.addShape(new Square(Quarter.FIRST));
        areaService.addShape(new HorizontalRhomb(Quarter.SECOND));
        areaService.addShape(new Circle(Quarter.THIRD));
    }

    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Answer answer;
        String key = req.getHeader("User-Agent");
        if (getServletContext().getAttribute(key) == null) {
            answer = new Answer();
        } else {
            answer = (Answer) getServletContext().getAttribute(key);
        }
        double x = Double.parseDouble(req.getParameter("x"));
        String[] yList = req.getParameterValues("y[]");
        String[] rList = req.getParameterValues("r[]");
        for (String yStr : yList) {
            double y = Double.parseDouble(yStr);
            for (String rStr : rList) {
                double r = Double.parseDouble(rStr);
                answer.addPoint(new Point(x, y, r, areaService.checkArea(x, y, r) ? "Попали" : "Не попали"));
            }
        }
        for (Point point : answer.getListPoint()) {
            System.out.printf("%s %s %s %s%n", point.getX(), point.getY(), point.getR(), point.getIsHit());
        }
        answer.setJsonPoint(parser.fromObjectToJson(answer));
        getServletContext().setAttribute(key, answer);
        getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }
}
