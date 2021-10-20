package ru.nanikon.second.service.model;

/**
 * @author Natalia Nikonova
 */
public class Square extends Shape {
    public Square(Quarter quarter) {
        super(quarter);
    }

    @Override
    public boolean checkHit(Double x, Double y, Double r) {
        return super.checkHit(x, y, r) && (x <= r) && (x >= -1 * r) && (y <= r) && (y >= -1 * r);
    }
}
