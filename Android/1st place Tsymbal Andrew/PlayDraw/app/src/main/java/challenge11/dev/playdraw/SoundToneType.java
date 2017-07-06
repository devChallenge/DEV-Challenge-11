package challenge11.dev.playdraw;

import android.graphics.Color;
import android.support.annotation.ColorInt;
import android.support.annotation.RawRes;

// sound tone
public enum  SoundToneType {
    PIANO(Color.YELLOW, R.raw.piano),
    BASSOON(Color.CYAN, R.raw.bassoon),
    TUBA(Color.BLUE, R.raw.tuba),
    USER_CUSTOM_TYPE(Color.MAGENTA, 0);

    @ColorInt public int color;
    @RawRes public int sound;

    SoundToneType(@ColorInt int color, @RawRes int sound) {
        this.color = color;
        this.sound = sound;
    }
}
