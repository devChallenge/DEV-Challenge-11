package app.model;

import org.junit.Test;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertTrue;

public class TripOptionTest {
    @Test
    public void getTripOptionInfoTest() {
        CityNode kiev = new CityNode("Kiev");
        CityNode kharkiv = new CityNode("Kharkiv");
        CityNode odessa = new CityNode("Odessa");

        Flight kievKharkiv = new Flight(1, LocalTime.of(10, 30), Duration.ofMinutes(60), kiev, kharkiv, 100);
        Flight kharkivOdessa = new Flight(2, LocalTime.of(12, 00), Duration.ofMinutes(70), kharkiv, odessa, 120);
        List<Flight> path = new ArrayList<>();
        path.add(kievKharkiv);
        path.add(kharkivOdessa);

        TripOption tripOption = new TripOption(path);
        assertTrue(tripOption.getConnectionsCount() == 2);
        assertTrue(tripOption.getDuration().equals(Duration.ofMinutes(160)));
        assertTrue(tripOption.getPrice() == 220);
    }
}
