package com.devchallenge.soundapp.helpers;


public class ParametersScreen {
    private float REAL_HEIGHT, REAL_WIDTH;
    public static int SCALE_HEIGHT, SCALE_WIDTH;
    public static int KOEF_HEIGHT = 10, KOEF_WIDTH = 10;

    public ParametersScreen() {
        calcParam();
    }

    public ParametersScreen(float REAL_WIDTH, float REAL_HEIGHT) {
        this.REAL_HEIGHT = REAL_HEIGHT;
        this.REAL_WIDTH = REAL_WIDTH;

        calcParam();
    }

    private void calcParam() {
        SCALE_WIDTH = (int) (REAL_WIDTH / KOEF_WIDTH);
        SCALE_HEIGHT = (int) (REAL_HEIGHT / KOEF_HEIGHT);
    }

    public float getREAL_HEIGHT() {

        return REAL_HEIGHT;
    }

    public void setREAL_HEIGHT(float REAL_HEIGHT) {
        this.REAL_HEIGHT = REAL_HEIGHT;
    }

    public float getREAL_WIDTH() {
        return REAL_WIDTH;
    }

    public void setREAL_WIDTH(float REAL_WIDTH) {
        this.REAL_WIDTH = REAL_WIDTH;
    }

    public int getSCALE_HEIGHT() {
        return SCALE_HEIGHT;
    }

    public void setSCALE_HEIGHT(int SCALE_HEIGHT) {
        this.SCALE_HEIGHT = SCALE_HEIGHT;
    }

    public int getSCALE_WIDTH() {
        return SCALE_WIDTH;
    }

    public void setSCALE_WIDTH(int SCALE_WIDTH) {
        this.SCALE_WIDTH = SCALE_WIDTH;
    }

    public int getKOEF_HEIGHT() {
        return KOEF_HEIGHT;
    }

    public void setKOEF_HEIGHT(int KOEF_HEIGHT) {
        this.KOEF_HEIGHT = KOEF_HEIGHT;
    }

    public int getKOEF_WIDTH() {
        return KOEF_WIDTH;
    }

    public void setKOEF_WIDTH(int KOEF_WIDTH) {
        this.KOEF_WIDTH = KOEF_WIDTH;
    }
}
