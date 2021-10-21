package ru.nanikon.second.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Natalia Nikonova
 */
public class Answer implements Serializable {
    @Getter @Setter
    private List<Point> listPoint = new ArrayList<>();
    @Getter @Setter
    private String jsonPoint = "";
    @Getter @Setter
    private Point lastPoint;

    public void addPoint(Point point) {
        listPoint.add(point);
        lastPoint = point;
    }
}
