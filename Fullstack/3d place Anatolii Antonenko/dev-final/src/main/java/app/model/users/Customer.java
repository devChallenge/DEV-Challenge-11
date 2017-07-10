package app.model.users;

public class Customer extends User {
    public Customer(String id) {
        super(id);
    }

    public Customer(String id, String email) {
        super(id, email);
    }

    public Customer() {}

    public Customer(User user) {
        super(user);
    }

    @Override
    public Role getRole() {
        return Role.Customer;
    }
}
