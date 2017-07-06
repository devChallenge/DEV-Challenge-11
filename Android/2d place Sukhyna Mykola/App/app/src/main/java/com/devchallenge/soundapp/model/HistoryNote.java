package com.devchallenge.soundapp.model;


public class HistoryNote {
    private String action;
    private Surface surface;


    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }


    public Surface getSurface() {
        return surface;
    }

    public void setSurface(Surface surface) {
        this.surface = surface;
    }

    public HistoryNote(String action, Surface surface) {

        this.action = action;
        this.surface = surface;
    }

    public HistoryNote clone() {
        return new HistoryNote(new String(action), surface.clone());
    }
}
