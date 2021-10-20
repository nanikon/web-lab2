package ru.nanikon.second.servlet;

import ru.nanikon.second.service.AreaService;
import ru.nanikon.second.service.model.*;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Natalia Nikonova
 */
public class AreaCheckServlet extends HttpServlet {
    @Inject
    private AreaService areaService;

    @PostConstruct
    public void configArea() {
        areaService.addShape(new Square(Quarter.FIRST));
        areaService.addShape(new HorizontalRhomb(Quarter.SECOND));
        areaService.addShape(new Circle(Quarter.THIRD));
    }

    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Point> pointList;
        if (getServletContext().getAttribute(req.getHeader("User-Agent")) == null) {
            pointList = new ArrayList<>();
        } else {
            pointList = (ArrayList<Point>) getServletContext().getAttribute(req.getHeader("User-Agent"));
        }
        double x = Double.parseDouble(req.getParameter("x"));
        String[] yList = req.getParameterValues("y[]");
        String[] rList = req.getParameterValues("r[]");
        for (String yStr : yList) {
            double y = Double.parseDouble(yStr);
            for (String rStr : rList) {
                double r = Double.parseDouble(rStr);
                pointList.add(new Point(x, y, r, areaService.checkArea(x, y, r) ? "Попали" : "Не попали"));
                getServletContext().setAttribute(req.getHeader("User-Agent"), pointList);
            }
        }
        for (Point point : pointList) {
            System.out.printf("%s %s %s %s%n", point.getX(), point.getY(), point.getR(), point.getIsHit());
        }
        getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }
}
