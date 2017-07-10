package app;

import app.model.Flight;

public class FlightService {
    public static void create(Flight flight) {
        FlightsGraph.addFlight(flight);
    }

    public static void updateCostForFlight(int id, int cost) {
        Flight flight = FlightsGraph.findFlightById(id);
        flight.setCost(cost);
    }

    public static void delete(Flight flight) {
        FlightsGraph.delete(flight);
    }
}
