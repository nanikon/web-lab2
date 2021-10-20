package ru.nanikon.second.service;

import ru.nanikon.second.service.model.Shape;

import javax.enterprise.context.ApplicationScoped;
import java.util.ArrayList;

/**
 * @author Natalia Nikonova
 */
public class AreaService {
    private final ArrayList<Shape> parts = new ArrayList<>();

    public void addShape(Shape shape) {
        parts.add(shape);
    }

    public boolean checkArea(Double x, Double y, Double r) {
        boolean result = false;
        for (Shape shape : parts) {
            result = result || shape.checkHit(x, y, r);
        }
        return result;
    }
}
