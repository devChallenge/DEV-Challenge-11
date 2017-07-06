package com.devchallenge.soundapp;

import android.content.Context;
import android.media.AudioManager;
import android.media.ToneGenerator;
import android.os.AsyncTask;
import android.widget.Toast;

import com.devchallenge.soundapp.callbacks.CallbackDrawProgressUpdate;
import com.devchallenge.soundapp.helpers.SettingsHelper;
import com.devchallenge.soundapp.helpers.SoundHelper;
import com.devchallenge.soundapp.model.Surface;
import com.devchallenge.soundapp.model.Tone;

import java.util.List;

import static java.lang.Thread.sleep;



public class TonePlayThread extends AsyncTask<Surface, Void, Void> {

    private CallbackDrawProgressUpdate udpate;
    private Context context;

    public TonePlayThread(CallbackDrawProgressUpdate udpate, Context context) {
        this.udpate = udpate;
        this.context = context;
    }



    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        udpate.setProgressUpdate(true);
    }

    @Override
    protected Void doInBackground(Surface... s) {
        long ticksPS = SettingsHelper.get().getTemp();
        long startTime, sleepTime;

        List<Tone> tones = SoundHelper.parseSurface(s[0]);

        for (int i = 0; i < tones.size(); i++) {


            Tone tone = tones.get(i);

            publishProgress(i);

            if (tone.getType() != Tone.NULL_TYPE) {
                startTime = System.currentTimeMillis();
                ToneGenerator toneGen = new ToneGenerator(AudioManager.STREAM_MUSIC, tone.getDuration());
                toneGen.startTone(tone.getType());

                sleepTime = ticksPS - (System.currentTimeMillis() - startTime);
                try {
                    if (sleepTime > 0)
                        sleep(sleepTime);
                } catch (Exception e) {
                }

                toneGen.stopTone();
                toneGen.release();

            } else {
                try {
                    sleep(ticksPS);
                } catch (Exception e) {
                }
            }


        }
        return null;

    }


    private void publishProgress(int i) {
        udpate.updateColumn(i);
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        super.onPostExecute(aVoid);
        udpate.setProgressUpdate(false);
        Toast.makeText(context, "End", Toast.LENGTH_SHORT).show();
    }
}
