package com.devchallenge.soundapp.helpers;

import android.content.Context;

import com.devchallenge.soundapp.callbacks.CallbackUpdate;
import com.devchallenge.soundapp.model.HistoryNote;
import com.devchallenge.soundapp.model.ParametersTool;
import com.devchallenge.soundapp.model.Point;
import com.devchallenge.soundapp.model.Surface;
import com.devchallenge.soundapp.model.Tool;


public class DrawHelper {

    private HistoryNote activeNote;
    private Tool tool;

    private boolean drawPlayProgress;
    private int drawPlayColunm;

    public int getDrawPlayColunm() {
        return drawPlayColunm;
    }

    public void setDrawPlayColunm(int drawPlayColunm) {
        this.drawPlayColunm = drawPlayColunm;
    }


    public boolean isDrawPlayProgress() {
        return drawPlayProgress;
    }

    public void setDrawPlayProgress(boolean drawPlayProgress) {
        this.drawPlayProgress = drawPlayProgress;
    }

    private ParametersTool parametersTool;
    private ParametersScreen parametersScreen;

    private CallbackUpdate updator;

    private Context context;

    private Surface surface;


    private Point old = new Point(0, 0);

    public Surface getSurface() {
        return surface;
    }

    public DrawHelper(Context c, int color, int sizeTool, float width, float height) {
        this.context = c;


        updator = (CallbackUpdate) c;


        parametersTool = new ParametersTool(color, sizeTool);
        parametersScreen = new ParametersScreen(width, height);


        tool = new Tool(parametersTool);

        surface = new Surface(parametersScreen);

        activeNote = new HistoryNote("INIT", surface);

        HistoryHelper.get().addNote(activeNote.clone());

    }

    public void newHistoryNote() {
        activeNote = new HistoryNote("draw", surface);
    }

    public void endHistoryNote() {
        HistoryHelper.get().addNote(activeNote.clone());
    }

    public void undo() {
        HistoryHelper.get().undo(surface);
        updator.updateCanvas();
    }

    public void redo() {
        HistoryHelper.get().redo(surface);
        updator.updateCanvas();
    }

    public void draw(int x, int y) {

        if (old.getX() != x || old.getY() != x) {

            old.setX(x);
            old.setY(y);

            tool.draw(x, y, surface);


            updator.updateCanvas();
        }
    }


    public void clear() {
        surface.clear();
        updator.updateCanvas();
    }


}
