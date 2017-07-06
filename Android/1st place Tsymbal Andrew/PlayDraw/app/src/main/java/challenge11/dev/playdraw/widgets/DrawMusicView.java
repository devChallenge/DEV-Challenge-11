package challenge11.dev.playdraw.widgets;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Build;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;

import challenge11.dev.playdraw.SoundToneType;
import challenge11.dev.playdraw.models.SoundModel;

public class DrawMusicView extends BaseMusicView implements View.OnTouchListener {

    @Nullable
    private DrawMusicListener drawMusicListener;

    private SoundToneType currentSoundToneType = SoundToneType.PIANO;

    // data for playing...
    private SoundModel[][] playMusicData = new SoundModel[numberOfCells][numberOfCells];

    public DrawMusicView(Context context) {
        super(context);
        init();
    }

    public DrawMusicView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public DrawMusicView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public DrawMusicView(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init();
    }

    private void init() {
        setWillNotDraw(false);
        setOnTouchListener(this);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        Paint myPaint = new Paint();
        myPaint.setColor(Color.rgb(0, 0, 0));
        myPaint.setStrokeWidth(10);
        canvas.drawRect(0, 0, fieldSizePx, fieldSizePx, myPaint);

        for (int row = 0; row < playMusicData.length; row++) {
            for (int col = 0; col < playMusicData[row].length; col++) {
                SoundModel soundModel = playMusicData[row][col];

                if (soundModel == null) {
                    continue;
                }

                Paint soundPaint = new Paint();
                soundPaint.setColor(soundModel.getToneType().color);
                soundPaint.setStrokeWidth(10);
                canvas.drawRect(
                        row * cellSizePx,
                        col * cellSizePx,
                        (row * cellSizePx) + cellSizePx,
                        (col * cellSizePx) + cellSizePx,
                        soundPaint);
            }
        }
    }

    public void clear() {
        for (int row = 0; row < playMusicData.length; row++) {
            for (int col = 0; col < playMusicData[row].length; col++) {
                playMusicData[row][col] = null;
            }
        }
        invalidate();
    }

    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {
        switch (motionEvent.getAction()) {
            case MotionEvent.ACTION_DOWN:
            case MotionEvent.ACTION_MOVE:

                float actualClickedX = motionEvent.getX();
                float actualClickedY = motionEvent.getY();

                if (actualClickedX > fieldSizePx || actualClickedY > fieldSizePx) {
                    return false;
                }

                if (actualClickedX <= 0 || actualClickedY <= 0) {
                    return false;
                }

                int clickedCellX = (int) Math.floor(actualClickedX / cellSizePx);
                int clickedCellY = (int) Math.floor(actualClickedY / cellSizePx);

                playMusicData[clickedCellX][clickedCellY] = new SoundModel(currentSoundToneType, clickedCellY);

                if (drawMusicListener != null) {
                    drawMusicListener.onGotSoundArray(playMusicData);
                }

                invalidate();
                break;

            default:
                break;
        }
        return true;
    }

    public void setDrawMusicListener(@Nullable DrawMusicListener drawMusicListener) {
        this.drawMusicListener = drawMusicListener;
    }

    public void setCurrentSoundToneType(SoundToneType currentSoundToneType) {
        this.currentSoundToneType = currentSoundToneType;
    }

    public interface DrawMusicListener {
        void onGotSoundArray(SoundModel[][] playMusicData);
    }
}
