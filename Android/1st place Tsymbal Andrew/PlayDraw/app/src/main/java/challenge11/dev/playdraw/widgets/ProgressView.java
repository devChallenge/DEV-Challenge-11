package challenge11.dev.playdraw.widgets;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Build;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.util.AttributeSet;

public class ProgressView extends BaseMusicView {

    private float speed = 0;

    private float currentXPos = 0;

    private int currentCel = 0;

    @Nullable
    private ProgressViewListener progressViewListener;

    public ProgressView(Context context) {
        super(context);
        init();
    }

    public ProgressView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public ProgressView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public ProgressView(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init();
    }

    private void init() {
        setWillNotDraw(false);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        currentXPos = currentXPos + speed;

        if (currentXPos > fieldSizePx) {
            currentXPos = 0;
        }

        Paint paint = new Paint();
        paint.setColor(Color.RED);
        paint.setStrokeWidth(4);
        canvas.drawLine(currentXPos, 0, currentXPos, fieldSizePx, paint);

        if (progressViewListener != null) {
            int calculatedCel = (int) Math.floor(currentXPos / cellSizePx);

            if (calculatedCel >= numberOfCells) {
                calculatedCel = calculatedCel - 1;
            }

            if (currentCel != calculatedCel) {
                currentCel = calculatedCel;
                progressViewListener.onUnderNewSection(currentCel);
            }
        }
    }

    public void setProgressViewListener(ProgressViewListener progressViewListener) {
        this.progressViewListener = progressViewListener;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
        invalidate();
    }

    public void setDoubleSpeed() {

    }

    public interface ProgressViewListener {
        void onUnderNewSection(int numberOfSection);
    }
}
