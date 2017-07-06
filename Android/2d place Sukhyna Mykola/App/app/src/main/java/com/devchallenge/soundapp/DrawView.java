package com.devchallenge.soundapp;


import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.View;
import android.widget.RelativeLayout;

import com.devchallenge.soundapp.callbacks.CallbackUpdate;
import com.devchallenge.soundapp.helpers.DrawHelper;
import com.devchallenge.soundapp.helpers.ParametersScreen;
import com.devchallenge.soundapp.model.Pixel;


public class DrawView extends View implements CallbackUpdate {


    private DrawHelper helper;


    public DrawView(Context context, DrawHelper helper) {
        super(context);
        this.helper = helper;
        resizeScreen();
    }


    public void resizeScreen() {
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(helper.getSurface().getWidth() * (ParametersScreen.KOEF_WIDTH), helper.getSurface().getHeight() * (ParametersScreen.KOEF_HEIGHT));
        setLayoutParams(params);
    }


    @Override
    protected void onDraw(Canvas canvas) {
        Paint paint = new Paint();

        paint.setStyle(Paint.Style.STROKE);
        canvas.drawRect(1, 1, getWidth(), getHeight(), paint);

        if (helper.isDrawPlayProgress()) {
            paint.setColor(Color.GREEN);
            canvas.drawRect(helper.getDrawPlayColunm() * ParametersScreen.KOEF_WIDTH, 0, (helper.getDrawPlayColunm() + 1) * ParametersScreen.KOEF_WIDTH, helper.getSurface().getHeight() * ParametersScreen.KOEF_HEIGHT, paint);

        }

        paint.setStyle(Paint.Style.FILL);
        for (int i = 0; i < ParametersScreen.SCALE_WIDTH; i++) {
            for (int j = 0; j < ParametersScreen.SCALE_HEIGHT; j++) {
                Pixel p = helper.getSurface().getPixel(i, j);
                if (p != null) {
                    paint.setColor(p.getColor());
                    canvas.drawRect(i * ParametersScreen.KOEF_WIDTH, j * ParametersScreen.KOEF_HEIGHT, (i + 1) * ParametersScreen.KOEF_WIDTH, (j + 1) * ParametersScreen.KOEF_HEIGHT, paint);
                }

            }

        }

    }


    @Override
    public void updateCanvas() {
        invalidate();
    }
}


