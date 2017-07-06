package com.devchallenge.soundapp;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.FrameLayout;
import android.widget.ImageButton;

import com.devchallenge.soundapp.callbacks.CallbackDrawProgressUpdate;
import com.devchallenge.soundapp.callbacks.CallbackUpdate;
import com.devchallenge.soundapp.helpers.DrawHelper;
import com.devchallenge.soundapp.model.Surface;

import static com.devchallenge.soundapp.helpers.ParametersScreen.KOEF_HEIGHT;
import static com.devchallenge.soundapp.helpers.ParametersScreen.KOEF_WIDTH;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, View.OnTouchListener, CallbackDrawProgressUpdate, CallbackUpdate {
    private DrawView drawView;
    private FrameLayout drawViewContainer;

    private DrawHelper helper;
    private ImageButton playButton;

    private Context context;


    private ViewTreeObserver.OnGlobalLayoutListener globalLayoutListener = new ViewTreeObserver.OnGlobalLayoutListener() {
        @TargetApi(Build.VERSION_CODES.JELLY_BEAN)
        @Override
        public void onGlobalLayout() {
            float height = drawViewContainer.getHeight();
            float width = drawViewContainer.getWidth();

            int toolSize = 1;

            helper = new DrawHelper(context, Color.RED, toolSize, width, height);

            drawView = new DrawView(context, helper);
            drawView.setOnTouchListener((View.OnTouchListener) context);

            drawViewContainer.addView(drawView);


            drawViewContainer.getViewTreeObserver().removeOnGlobalLayoutListener(this);

        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        context = this;

        initViews();
    }

    private void initViews() {
        this.playButton = (ImageButton) findViewById(R.id.play_button);
        this.drawViewContainer = (FrameLayout) findViewById(R.id.drawview_container);
        this.drawViewContainer.getViewTreeObserver().addOnGlobalLayoutListener(globalLayoutListener);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.play_button:
                play(helper.getSurface());
                break;
            case R.id.settings_button:
                SettingsDialog.newInstance().show(getSupportFragmentManager(),"SETTINGS");
                break;
        }
    }


    private void play(Surface s) {
        new TonePlayThread(this,this).execute(s);

    }

    @Override
    public boolean onTouch(View view, MotionEvent event) {

        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                helper.newHistoryNote();
                return true;
            case MotionEvent.ACTION_MOVE:

                float x = event.getX();
                float y = event.getY();

                int convertY = (int) (y / KOEF_HEIGHT);
                int convertX = (int) (x / KOEF_WIDTH);

                helper.draw(convertX, convertY);
                return true;

            case MotionEvent.ACTION_UP:

                helper.endHistoryNote();
                return true;
            default:
                return false;
        }
    }


    @Override
    public void updateCanvas() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                drawView.updateCanvas();
            }
        });

    }


    @Override
    public void setProgressUpdate(boolean isDraw) {

        helper.setDrawPlayProgress(isDraw);

        if (isDraw) {
            drawView.setEnabled(false);
            playButton.setClickable(false);
        } else {
            playButton.setClickable(true);
            drawView.setEnabled(true);
        }
    }

    @Override
    public void updateColumn(int column) {
        helper.setDrawPlayColunm(column);
        updateCanvas();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu, menu);
        return true;

    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        switch (id) {
            case R.id.action_undo:
                helper.undo();
                return true;
            case R.id.action_redo:
                helper.redo();
                return true;
            case R.id.action_clear:
                helper.clear();
                return true;

        }
        return false;
    }

}
