package challenge11.dev.playdraw.widgets;

import android.content.Context;
import android.graphics.Canvas;
import android.os.Build;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.annotation.StyleRes;
import android.util.AttributeSet;
import android.widget.FrameLayout;

import challenge11.dev.playdraw.SoundToneType;
import challenge11.dev.playdraw.models.SoundModel;

public class DrawMusicAndPlayView extends FrameLayout implements ProgressView.ProgressViewListener, DrawMusicView.DrawMusicListener {

    private DrawMusicView drawMusicView;
    private ProgressView progressView;

    @Nullable
    private PlayMusicListener playMusicListener;
    private SoundModel[][] playMusicData;

    private int standardSpeed = 5; // 5 px ~ 120 bpm
    private int currentSpeed = standardSpeed;

    // main view, consist `music draw view` and `progress view` (line)
    public DrawMusicAndPlayView(@NonNull Context context) {
        super(context);
        init(context);
    }

    public DrawMusicAndPlayView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public DrawMusicAndPlayView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public DrawMusicAndPlayView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr, @StyleRes int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context);
    }

    private void init(Context context) {
        drawMusicView = new DrawMusicView(context);
        progressView = new ProgressView(context);

        progressView.setProgressViewListener(this);
        drawMusicView.setDrawMusicListener(this);

        addView(drawMusicView);
        addView(progressView);
    }

    public void play() {
        progressView.setSpeed(currentSpeed);
    }

    public void stop() {
        progressView.setSpeed(0);
    }

    public void updateFrame() {
        progressView.invalidate();
    }

    public void setPlayMusicListener(PlayMusicListener playMusicListener) {
        this.playMusicListener = playMusicListener;
    }

    @Override
    public void onUnderNewSection(int numberOfSection) {
        // "no money no honey"
        if (playMusicData == null) {
            return;
        }

        if (playMusicListener != null) {
            for (int i = 0; i < playMusicData[numberOfSection].length; i++) {
                if (playMusicData[numberOfSection][i] != null) {
                    playMusicListener.onGotSound(playMusicData[numberOfSection][i]);
                }
            }
        }
    }

    @Override
    public void onGotSoundArray(SoundModel[][] playMusicData) {
        this.playMusicData = playMusicData;
    }

    public void setInstrument(SoundToneType currentSoundToneType) {
        drawMusicView.setCurrentSoundToneType(currentSoundToneType);
    }

    public void clear() {
        drawMusicView.clear();
    }

    public void setDoubleSpeed() {
        currentSpeed = standardSpeed * 2;
        progressView.setSpeed(currentSpeed);
    }

    // 120 bpm
    public void setNormalSpeed() {
        currentSpeed = standardSpeed;
        progressView.setSpeed(currentSpeed);
    }

    public interface PlayMusicListener {
        void onGotSound(SoundModel soundModel);
    }
}
