package com.devchallenge.soundapp;


import android.app.Dialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AlertDialog;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.SeekBar;
import android.widget.TextView;

import com.devchallenge.soundapp.helpers.SettingsHelper;


public class SettingsDialog extends DialogFragment {


    private static final int DELTA = 100;

    private SeekBar seekSize;
    private TextView textSize;

    public static SettingsDialog newInstance() {

        Bundle args = new Bundle();


        SettingsDialog fragment = new SettingsDialog();
        fragment.setArguments(args);
        return fragment;
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {

        View v = LayoutInflater.from(getContext()).inflate(R.layout.settings_fragment, null);

        seekSize = (SeekBar) v.findViewById(R.id.seekSize);
        textSize = (TextView) v.findViewById(R.id.textSize);


        int temp = SettingsHelper.get().getTemp();


        textSize.setText(String.valueOf(temp));

        seekSize.setMax(900);
        seekSize.setProgress(temp - DELTA);

        seekSize.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                if (fromUser) {
                    textSize.setText(String.valueOf(progress + DELTA));

                }
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        return new AlertDialog.Builder(getContext()).
                setView(v)
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        SettingsHelper.get().setTemp((seekSize.getProgress() + DELTA));
                        dismiss();
                    }
                })
                // .setNegativeButton("CANCEL", null)*/
                .setTitle("Pick Temp")
                .create();
    }




}
