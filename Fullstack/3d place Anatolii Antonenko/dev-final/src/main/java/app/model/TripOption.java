package app.model;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

/**
 * This class represents one path from origin to destination
 */
public class TripOption {
    public static final int TRANSFER_TIME = 30;
    List<Flight> path;

    public TripOption(List<Flight> path) {
        this.path = path;
    }

    public List<Long> getFlightsIds() {
        return path.stream().map(f -> f.getId()).collect(Collectors.toList());
    }

    public Duration getDuration() {
        Duration result = Duration.ZERO;
        if (path.size() == 1) {
            return path.get(0).getDuration();
        } else {
            for(Flight flight: path) {
                result = result.plus(flight.getDuration());
                result = result.plus(Duration.ofMinutes(TRANSFER_TIME));
            }
            return result.minusMinutes(TRANSFER_TIME);
        }
    }

    @Override
    public String toString() {
        return "TripOption{" +
                "path=" + path +
                '}'
                + ", duration: " + getDuration()
                + ", price: " + getPrice()
                + ", flights: " + getFlightsIds();
    }

    public long getPrice() {
        return path.stream().mapToLong(Flight::getCost).sum();
    }

    public int getConnectionsCount() {
        return path.size();
    }
}
