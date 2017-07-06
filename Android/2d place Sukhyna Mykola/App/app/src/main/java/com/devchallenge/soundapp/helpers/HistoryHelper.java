package com.devchallenge.soundapp.helpers;

import com.devchallenge.soundapp.model.HistoryNote;
import com.devchallenge.soundapp.model.Surface;

import java.util.ArrayList;
import java.util.List;



public class HistoryHelper {
    private List<HistoryNote> notes;
    private int positionNote;
    public static HistoryHelper helper;

    public static HistoryHelper get() {
        if (helper == null)
            helper = new HistoryHelper();
        return helper;
    }

    private HistoryHelper() {
        notes = new ArrayList<>();
    }

    public void addNote(HistoryNote note) {
        //Якщо було натиснуто Undo і потім щось намальвано
        if (positionNote - notes.size() != -1 && notes.size() >= 1) {

            for (int i = positionNote + 1; i < notes.size();) {
                notes.remove(i);
            }
        }
        positionNote = notes.size();
        notes.add(note);
    }

    public void undo(Surface surface) {
        if (positionNote - 1 >= 0) {
            HistoryNote note = notes.get(--positionNote);

            for (int i = 0; i < surface.getWidth(); i++) {
                for (int j = 0; j < surface.getHeight(); j++) {
                    surface.setPixel(i, j, note.getSurface().getPixel(i, j));
                }

            }
        }
        if (positionNote < 0)
            positionNote = 0;

    }

    public void redo(Surface surface) {
        if (positionNote + 1 < notes.size()) {
            HistoryNote note = notes.get(++positionNote);

            for (int i = 0; i < surface.getWidth(); i++) {
                for (int j = 0; j < surface.getHeight(); j++) {
                    surface.setPixel(i, j, note.getSurface().getPixel(i, j));
                }

            }
        }
        if (positionNote > notes.size() - 1)
            positionNote = notes.size() - 1;

    }
}
