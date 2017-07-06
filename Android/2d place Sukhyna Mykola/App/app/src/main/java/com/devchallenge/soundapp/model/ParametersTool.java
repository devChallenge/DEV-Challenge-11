package com.devchallenge.soundapp.model;


public class ParametersTool {
    protected int color;

    protected int sizeTool;

    public ParametersTool(int color, int sizeTool) {
        this.color = color;

        this.sizeTool  = sizeTool;
    }


    public ParametersTool() {
    }

    public int getColor() {
        return color;
    }

    public void setColor(int color) {
        this.color = color;
    }


    public int getSizeTool() {
        return sizeTool;
    }

    public void setSizeTool(int sizeTool) {
        this.sizeTool = sizeTool;
    }




}
