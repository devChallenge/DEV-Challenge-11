package challenge11.dev.playdraw;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.annotation.IdRes;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioGroup;

import java.io.File;
import java.util.Timer;
import java.util.TimerTask;

import challenge11.dev.playdraw.controllers.PlaySoundsController;
import challenge11.dev.playdraw.models.SoundModel;
import challenge11.dev.playdraw.widgets.DrawMusicAndPlayView;

public class MainActivity extends AppCompatActivity implements DrawMusicAndPlayView.PlayMusicListener {

    private static final long TIME_FOR_UPDATE_FRAME = 10;

    private DrawMusicAndPlayView drawMusicAndPlayView;

    private PlaySoundsController playSoundsController;

    private Button btnPlayStop, btnClear, btnSpeed;
    private RadioGroup rgChangeInstrument;

    private boolean isPlaying = false;
    private boolean isDoubleSpeed = false;
    private Timer mTimer;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        playSoundsController = new PlaySoundsController(this);

        drawMusicAndPlayView = (DrawMusicAndPlayView) findViewById(R.id.drawMusicAndPlayView);
        drawMusicAndPlayView.setPlayMusicListener(this);

        rgChangeInstrument = (RadioGroup) findViewById(R.id.rb_change_instrument);
        rgChangeInstrument.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, @IdRes int radioButtonId) {
                switch (radioButtonId) {
                    case R.id.rb_piano:
                        drawMusicAndPlayView.setInstrument(SoundToneType.PIANO);
                        break;
                    case R.id.rb_tuba:
                        drawMusicAndPlayView.setInstrument(SoundToneType.TUBA);
                        break;
                    case R.id.rb_bassoon:
                        drawMusicAndPlayView.setInstrument(SoundToneType.BASSOON);
                        break;
                    case R.id.rb_custom:
                        Intent intent = new Intent();
                        intent.setType("audio/*");
                        intent.setAction(Intent.ACTION_GET_CONTENT);
                        startActivityForResult(intent, 11);
                        break;
                }
            }
        });

        btnSpeed = (Button) findViewById(R.id.btn_speed);
        btnSpeed.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!isDoubleSpeed) {
                    btnSpeed.setText("ТЕМП: 240");
                    isDoubleSpeed = true;
                    drawMusicAndPlayView.setDoubleSpeed();
                } else {
                    btnSpeed.setText("ТЕМП: 120");
                    isDoubleSpeed = false;
                    drawMusicAndPlayView.setNormalSpeed();

                }
            }
        });

        btnClear = (Button) findViewById(R.id.btn_clear);
        btnClear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                drawMusicAndPlayView.clear();
            }
        });

        btnPlayStop = (Button) findViewById(R.id.btn_play_stop);
        btnPlayStop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!isPlaying) {
                    drawMusicAndPlayView.play();
                    btnPlayStop.setText(R.string.stop);
                    isPlaying = true;
                } else {
                    drawMusicAndPlayView.stop();
                    btnPlayStop.setText(R.string.play);
                    isPlaying = false;
                }
            }
        });

        mTimer = new Timer();
        mTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        drawMusicAndPlayView.updateFrame();
                    }
                });
            }
        }, 0, TIME_FOR_UPDATE_FRAME);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mTimer.cancel();
    }

    @Override
    public void onGotSound(SoundModel soundModel) {
        playSoundsController.playSound(soundModel);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK && data != null) {
            // TODO time, time, time...
            //playSoundsController.setSoundCustomFile(data.getData().getPath());
            //drawMusicAndPlayView.setInstrument(SoundToneType.USER_CUSTOM_TYPE);
        }
    }
}
