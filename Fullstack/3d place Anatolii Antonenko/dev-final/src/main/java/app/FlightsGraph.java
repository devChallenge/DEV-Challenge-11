package app;

import app.model.CityNode;
import app.model.Flight;
import app.model.TripOption;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

public class FlightsGraph {
    private static List<Flight> flights = new ArrayList<>();

    static {
        CityNode kiev = new CityNode("Kiev");
        CityNode kharkiv = new CityNode("Kharkiv");
        CityNode odessa = new CityNode("Odessa");

        Flight kievKharkiv = new Flight(1, LocalTime.of(10, 30), Duration.ofMinutes(60), kiev, kharkiv, 100);
        Flight kharkivOdessa = new Flight(2, LocalTime.of(12, 00), Duration.ofMinutes(70), kharkiv, odessa, 120);
        Flight kievOdessa = new Flight(3, LocalTime.of(13, 00), Duration.ofMinutes(90), kiev, odessa, 300);
        flights.add(kievKharkiv);
        flights.add(kharkivOdessa);
        flights.add(kievOdessa);
    }

    /**
     *
     * @param origin - from City
     * @param destination - to City
     * @return all possible paths from origin to destination in format: [[Flight1, Flight2, ...], [Flight3], ...]
     * TripOption represent one path from origin to destination
     * Breadth-first search (BFS) implementation
     */
    public static List<TripOption> findPaths(CityNode origin, CityNode destination) {
        List<TripOption> result = new ArrayList<>();
        List<Flight> originFlights = getOriginFlights(origin);

        for(Flight flight:originFlights) {
            List<Flight> path = new ArrayList<>();
            proceedFlight(flight, path, destination);

            if (!path.isEmpty() && isGoToDestination(path, destination)) {
                result.add(new TripOption(path));
            }
        }
        return result;
    }

    private static boolean isGoToDestination(List<Flight> path, CityNode destination) {
        return path.stream().anyMatch(flight -> flight.getDestination().equals(destination));
    }

    private static void proceedFlight(Flight flight, List<Flight> path, CityNode destination) {
        if (flight.getDestination().equals(destination)) {
            path.add(flight);
        } else {
            path.add(flight);
            for(Flight f: getOriginFlights(flight.getDestination())) {
                proceedFlight(f, path, destination);
            }
        }
    }

    private static List<Flight> getOriginFlights(CityNode origin) {
        return flights.stream().filter(f -> f.getOrigin().equals(origin)).collect(Collectors.toList());
    }

    public static void addFlight(Flight flight) {
        flights.add(flight);
    }

    public static Flight findFlightById(int id) {
        Optional<Flight> optional = flights.stream().filter(flight -> flight.getId() == id).findFirst();
        if (optional.isPresent()) {
            return optional.get();
        } else {
            return null;
        }
    }

    public static void delete(Flight flight) {
        flights.remove(flight);
    }
}
