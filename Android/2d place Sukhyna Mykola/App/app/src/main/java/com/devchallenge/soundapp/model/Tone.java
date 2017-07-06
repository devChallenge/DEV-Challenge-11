package com.devchallenge.soundapp.model;


public class Tone {
    public static final int MAX_TYPE = 15;
    public static final int NULL_TYPE = -1;

    private int type;
    private int duration;

    public Tone(int type) {
        this.type = type;
    }

    public int getType() {
        return type;
    }

    public int getDuration() {
        return duration;
    }

    public Tone(int type, int duration) {

        this.type = type;
        this.duration = duration;
    }
}
