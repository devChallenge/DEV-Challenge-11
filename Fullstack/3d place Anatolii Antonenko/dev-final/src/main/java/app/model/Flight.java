package app.model;

import java.time.Duration;
import java.time.LocalTime;

public class Flight {
    private long id;
    private LocalTime start;
    private Duration duration;
    private CityNode origin;
    private CityNode destination;
    private long cost;

    @Override
    public String toString() {
        return "Flight{" +
                "id=" + id +
                ", start=" + start +
                ", duration=" + duration +
                ", origin=" + origin +
                ", destination=" + destination +
                ", cost=" + cost +
                '}';
    }

    public Flight(long id, LocalTime start, Duration duration, CityNode origin, CityNode destination, int cost) {
        this.id = id;
        this.start = start;
        this.duration = duration;
        this.origin = origin;
        this.destination = destination;
        this.cost = cost;
    }

    public long getId() {
        return id;
    }

    public Duration getDuration() {
        return duration;
    }

    public long getCost() {
        return cost;
    }

    public CityNode getOrigin() {
        return origin;
    }

    public CityNode getDestination() {
        return destination;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }
}
