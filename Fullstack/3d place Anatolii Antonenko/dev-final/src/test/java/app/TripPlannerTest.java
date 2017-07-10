package app;

import app.model.CityNode;
import app.model.Criteria;
import app.model.Trip;
import app.model.TripOption;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertTrue;

public class TripPlannerTest {
    @Test
    public void planTest() {
        CityNode kiev = new CityNode("Kiev");
        CityNode odessa = new CityNode("Odessa");
        Trip trip = new Trip(kiev, odessa, Criteria.price);
        List<TripOption> options = TripPlanner.plan(trip, 2);
        System.out.println("Options that was found: " + options);
        assertTrue(options.size() == 2);
    }

    @Test
    public void sortByCriteriaTest() {
        CityNode kiev = new CityNode("Kiev");
        CityNode odessa = new CityNode("Odessa");

        Trip trip = new Trip(kiev, odessa, Criteria.connections);
        List<TripOption> options = TripPlanner.plan(trip, 2);
        System.out.println("Options by connections count: " + options);
        assertTrue(options.get(0).getConnectionsCount() < options.get(1).getConnectionsCount());

        trip = new Trip(kiev, odessa, Criteria.price);
        options = TripPlanner.plan(trip, 2);
        System.out.println("Options by price: " + options);
        assertTrue(options.get(0).getPrice() < options.get(1).getPrice());

        trip = new Trip(kiev, odessa, Criteria.time);
        options = TripPlanner.plan(trip, 2);
        System.out.println("Options by time: " + options);
        assertTrue(options.get(0).getDuration().compareTo(options.get(1).getDuration()) < 0);
    }
}
