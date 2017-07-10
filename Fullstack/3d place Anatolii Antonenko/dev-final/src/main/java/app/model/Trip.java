package app.model;

public class Trip {
    private CityNode origin;
    private CityNode destination;
    private Criteria efficiency;

    public Trip(CityNode origin, CityNode destination, Criteria efficiency) {
        this.origin = origin;
        this.destination = destination;
        this.efficiency = efficiency;
    }

    public CityNode getOrigin() {
        return origin;
    }

    public CityNode getDestination() {
        return destination;
    }

    public Criteria getEfficiency() {
        return efficiency;
    }
}
