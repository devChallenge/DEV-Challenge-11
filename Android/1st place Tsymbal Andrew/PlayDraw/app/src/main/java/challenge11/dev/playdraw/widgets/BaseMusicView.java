package challenge11.dev.playdraw.widgets;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Build;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.util.AttributeSet;
import android.view.View;

public abstract class BaseMusicView extends View {

    protected static final int numberOfCells = 20;

    protected int fieldSizePx = 0;
    protected int cellSizePx = 0;

    public BaseMusicView(Context context) {
        super(context);
        init();
    }

    public BaseMusicView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public BaseMusicView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public BaseMusicView(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init();
    }

    private void calculateOffsets() {
        fieldSizePx = getHeight() < getWidth() ? getHeight() : getWidth();
        cellSizePx = fieldSizePx / numberOfCells;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        if (fieldSizePx == 0) {
            calculateOffsets();
        }

    }

    private void init() {
        setWillNotDraw(false);
    }
}
