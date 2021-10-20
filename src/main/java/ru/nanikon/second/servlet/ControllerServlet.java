package ru.nanikon.second.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

/**
 * @author Natalia Nikonova
 */
public class ControllerServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if ((req.getParameter("x") == null)
                || (req.getParameterValues("y[]") == null)
                || (req.getParameterValues("r[]") == null)) {
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        } else {
            getServletContext().getRequestDispatcher("/check").forward(req, resp);
        }
    }
}
