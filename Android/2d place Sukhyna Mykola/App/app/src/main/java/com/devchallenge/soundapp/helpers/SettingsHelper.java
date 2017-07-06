package com.devchallenge.soundapp.helpers;

public class SettingsHelper {

    private int temp;

    public void setTemp(int temp) {
        this.temp = temp;
    }

    public int getTemp() {

        return temp;
    }

    public static SettingsHelper helper;

    public static SettingsHelper get() {
        if (helper == null)
            helper = new SettingsHelper();
        return helper;
    }


    private SettingsHelper() {
        this.temp = 500;
    }
}
