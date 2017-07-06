package com.devchallenge.soundapp.helpers;


import com.devchallenge.soundapp.model.Surface;
import com.devchallenge.soundapp.model.Tone;

import java.util.ArrayList;
import java.util.List;

public class SoundHelper {


    public static List<Tone> parseSurface(Surface surface) {
        List<Tone> tones = new ArrayList<>();
        for (int i = 0; i < surface.getWidth(); i++) {
            tones.add(parseSurfaceColumn(surface, i));
        }

        return tones;

    }

    private static Tone parseSurfaceColumn(Surface surface, int column) {
        int count = 0;
        int type = 0;
        for (int i = 0; i < surface.getHeight(); i++) {
            if (surface.getPixel(column, i) != null) {
                type += calcType(i, surface.getHeight() - 1);
                count++;
            }
        }
        if (count > 0)
            return new Tone((int) (type / (double) count), SettingsHelper.get().getTemp());
        else return new Tone(Tone.NULL_TYPE);
    }

    private static int calcType(int curent, int max) {
        return (int) ((curent / ((double) max)) * Tone.MAX_TYPE);
    }

}
