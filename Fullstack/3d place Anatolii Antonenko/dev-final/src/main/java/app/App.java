package app;

import app.model.*;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import static spark.Spark.*;

public class App {
    private static final Logger LOG = LoggerFactory.getLogger(App.class);

    public static void main(String[] args) {
        port(8080);
        staticFiles.location("/public");
        Gson gson = new Gson();

        //GET /trips?origin=Kyiv&destination=Iasi&efficiency=time&results=1
        get("/trips", ((request, response) -> {
            String originString = request.raw().getParameter("origin");
            String destinationString = request.raw().getParameter("destination");
            String efficiency = request.raw().getParameter("efficiency");
            int results = Integer.parseInt(request.raw().getParameter("results"));
            Trip trip = new Trip(new CityNode(originString), new CityNode(destinationString), Criteria.valueOf(efficiency));
            LOG.debug("Trip: " + trip);
            List<TripOption> plan = TripPlanner.plan(trip, results);
            LOG.debug("Plan: " + plan);
            return plan;
        }), gson::toJson);

        //PUT /flights?id=1&start=10:30&duration=60&origin=Kyiv&destination=Bucharest&cost=200
        put("/flights", ((request, response) -> {
            int id = Integer.parseInt(request.raw().getParameter("id"));
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
            LocalTime start = LocalTime.parse(request.raw().getParameter("start"), formatter);
            Duration duration = Duration.ofMinutes(Integer.parseInt(request.raw().getParameter("duration")));
            String originString = request.raw().getParameter("origin");
            String destinationString = request.raw().getParameter("destination");
            int cost = Integer.parseInt(request.raw().getParameter("cost"));

            Flight flight = new Flight(id, start, duration, new CityNode(originString),
                    new CityNode(destinationString), cost);
            FlightService.create(flight);
            LOG.debug("Added flight: " + flight);
            return ErrorCode.OK;
        }), gson::toJson);
        //POST /flights?id=1&cost=100
        post("/flights", ((request, response) -> {
            Map<String, String> params = gson.fromJson(request.body(), Map.class);
            int id = Integer.parseInt(params.get("id"));
            int cost = Integer.parseInt(params.get("cost"));
            FlightService.updateCostForFlight(id, cost);
            return ErrorCode.OK;
        }), gson::toJson);
        //GET /flights?id=1
        get("/flights", ((request, response) -> {
            int id = Integer.parseInt(request.raw().getParameter("id"));
            return FlightsGraph.findFlightById(id);
        }));
        //DELETE /flights?id=1
        delete("/flights", ((request, response) -> {
            int id = Integer.parseInt(request.raw().getParameter("id"));
            Flight flight = FlightsGraph.findFlightById(id);
            FlightService.delete(flight);
            return ErrorCode.OK;
        }));

        get("/user", ((request, response) -> {
            String email = request.raw().getParameter("email");
            return Store.getUserByEmail(email);
        }), gson::toJson);
    }
}
