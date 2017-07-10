package app.model;

public class CityNode {
    String name;

    public CityNode(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CityNode)) return false;
        CityNode cityNode = (CityNode) o;
        return name.equals(cityNode.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public String toString() {
        return "CityNode{" +
                "name='" + name + '\'' +
                '}';
    }
}
