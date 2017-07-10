package app;

import app.model.Criteria;
import app.model.Trip;
import app.model.TripOption;

import java.util.List;
import java.util.stream.Collectors;

public class TripPlanner {
    public static List<TripOption> plan(Trip trip, int optionCount) {
        List<TripOption> result = FlightsGraph.findPaths(trip.getOrigin(), trip.getDestination());
        sortByEfficiency(result, trip.getEfficiency());
        if (result.size() >= optionCount) {
            return result.stream().limit(optionCount).collect(Collectors.toList());
        } else {
            return result;
        }
    }

    private static void sortByEfficiency(List<TripOption> tripOptions, Criteria efficiency) {
        if (efficiency == Criteria.connections) {
            tripOptions.sort(((o1, o2) -> o1.getConnectionsCount() - o2.getConnectionsCount()));
        } else if (efficiency == Criteria.price) {
            tripOptions.sort(((o1, o2) -> (int)((o1.getPrice() - o2.getPrice()))));
        } else if (efficiency == Criteria.time) {
            tripOptions.sort(((o1, o2) -> o1.getDuration().compareTo(o2.getDuration())));
        } else {
            throw new RuntimeException("Not supported Criteria");
        }
    }
}
