package challenge11.dev.playdraw.models;

import challenge11.dev.playdraw.SoundToneType;

public class SoundModel {

    private SoundToneType toneType;
    private int soundLevel = 0;

    public SoundToneType getToneType() {
        return toneType;
    }

    public SoundModel(SoundToneType toneType, int soundLevel) {
        if (soundLevel > 20 || soundLevel < 0) {
            throw new RuntimeException("Sound level is from 0 to 20.");
        }

        this.toneType = toneType;
        this.soundLevel = soundLevel;

    }

    public int getSoundLevel() {
        return soundLevel;
    }
}
