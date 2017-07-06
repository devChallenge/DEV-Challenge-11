package challenge11.dev.playdraw.controllers;

import android.content.Context;
import android.media.AudioManager;
import android.media.SoundPool;
import android.net.Uri;
import android.os.Build;

import java.io.File;

import challenge11.dev.playdraw.R;
import challenge11.dev.playdraw.SoundToneType;
import challenge11.dev.playdraw.models.SoundModel;

public class PlaySoundsController {

    private SoundPool soundPool;

    private int soundIdPiano;
    private int soundIdTuba;
    private int soundIdViolin;
    private int soundIdCustom;

    private Context context;

    public PlaySoundsController(Context context) {
        this.context = context;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            soundPool = new SoundPool.Builder()
                    .setMaxStreams(10)
                    .build();
        } else {
            soundPool = new SoundPool(10, AudioManager.STREAM_MUSIC, 1);
        }
        soundIdPiano = soundPool.load(context, SoundToneType.PIANO.sound, 0);
        soundIdTuba = soundPool.load(context, SoundToneType.TUBA.sound, 0);
        soundIdViolin = soundPool.load(context, SoundToneType.BASSOON.sound, 0);
    }

    public void setSoundCustomFile(String path) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            soundPool = new SoundPool.Builder()
                    .setMaxStreams(10)
                    .build();
        } else {
            soundPool = new SoundPool(10, AudioManager.STREAM_MUSIC, 1);
        }
        soundIdCustom = soundPool.load(path, 1);
    }

    public void playSound(SoundModel soundModel) {
        int soundId;

        switch (soundModel.getToneType()) {
            case PIANO:
                soundId = soundIdPiano;
                break;

            case TUBA:
                soundId = soundIdTuba;
                break;

            case BASSOON:
                soundId = soundIdViolin;
                break;

            default:
                soundId = soundIdCustom;
                break;
        }

        // mmm, some magic
        float soundLvl = (float) (.5 + (1.0 - soundModel.getSoundLevel() / 20.0));

        soundPool.play(soundId, 1,1,0,0, soundLvl);
    }

}
