package ru.nanikon.second.service.model;

/**
 * @author Natalia Nikonova
 */
public class HorizontalRhomb extends Shape{
   public HorizontalRhomb(Quarter quarter) {
      super(quarter);
   }

   @Override
   public boolean checkHit(Double x, Double y, Double r) {
      return super.checkHit(x, y, r)
              && (y <= (r - x) / 2)
              && (y >= (x - r) / 2)
              && (y >= -(x + r) / 2)
              && (y <= (x + r) / 2);
   }
}
