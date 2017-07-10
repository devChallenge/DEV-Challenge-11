package app.model.users;

public class Operator extends User {
    public Operator(String clientId) {
        super(clientId);
    }

    public Operator(String id, String email) {
        super(id, email);
    }

    public Operator() { }

    public Operator(User user) {
        super(user);
    }

    @Override
    public Role getRole() {
        return Role.Operator;
    }
}
