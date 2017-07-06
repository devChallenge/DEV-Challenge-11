package com.devchallenge.soundapp.model;

import android.util.Log;



public  class Tool {
    protected ParametersTool parametersTool;
    protected final String TAG = "Tool";


    public void setParametersTool(ParametersTool parametersTool) {
        this.parametersTool = parametersTool;
    }

    public ParametersTool getParametersTool() {
        return parametersTool;
    }

    public Tool(ParametersTool parametersTool) {
        this.parametersTool = parametersTool;
    }

    public  Pixel draw(int x, int y, Surface surface){
        double delta = parametersTool.getSizeTool() / 2.0;

        for (int i = (int) -delta; i < delta; i++) {
            for (int j = (int) -delta; j < delta; j++) {
                try {
                    Pixel newPixel = new Pixel(parametersTool.getColor(), parametersTool.getSizeTool(), x + i, y + j);
                    surface.setPixel(x + i, y + j, newPixel);

                } catch (Exception e) {
                    Log.d(TAG, "IndexOutOfBoundsException");
                }

            }
        }
        return surface.getPixel(x,y);
    };
}
