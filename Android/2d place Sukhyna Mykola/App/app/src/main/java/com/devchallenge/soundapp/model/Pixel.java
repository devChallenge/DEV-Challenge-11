package com.devchallenge.soundapp.model;


public class Pixel extends ParametersTool {

    public Pixel(int size, int color, int x, int y) {
        super(size, color);
        this.x = x;
        this.y = y;
    }


    private int x, y;


    public Pixel(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public Pixel clone() {
        return new Pixel( color, sizeTool, x, y);
    }

}