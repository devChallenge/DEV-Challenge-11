package com.devchallenge.soundapp.model;


import com.devchallenge.soundapp.helpers.ParametersScreen;

public class Surface {
    private Pixel[][] pixels;
    private int width, height;

    public Pixel[][] getPixels() {
        return pixels;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public Surface(ParametersScreen parametersScreen) {
        this.width = parametersScreen.getSCALE_WIDTH();
        this.height = parametersScreen.getSCALE_HEIGHT();
        this.pixels = new Pixel[width][height];

    }

    public void clear() {
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                setPixel(i, j, null);
            }
        }
    }

    public Surface(Pixel[][] pixels) {
        this.pixels = pixels;
        this.width = pixels.length;
        this.height = pixels[0].length;
    }

    public void setPixel(int x, int y, Pixel newPixel) {
        try {
            pixels[x][y] = newPixel;
        } catch (IndexOutOfBoundsException e) {
            e.printStackTrace();
        }

    }

    public Pixel getPixel(int x, int y) {
        try {
            return pixels[x][y];
        } catch (IndexOutOfBoundsException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Surface clone() {
        Pixel[][] newPixels = new Pixel[width][height];
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (pixels[i][j] != null)
                    newPixels[i][j] = pixels[i][j].clone();
            }

        }
        return new Surface(newPixels);
    }





}
