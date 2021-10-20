package ru.nanikon.second.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

/**
 * @author Natalia Nikonova
 */
@AllArgsConstructor
@NoArgsConstructor
public class Point implements Serializable {
    @Getter @Setter
    double x;
    @Getter @Setter
    double y;
    @Getter @Setter
    double r;
    @Getter @Setter
    String isHit;
}
