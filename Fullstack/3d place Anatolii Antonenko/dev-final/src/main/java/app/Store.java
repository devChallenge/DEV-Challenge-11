package app;

import app.model.users.Customer;
import app.model.users.Operator;
import app.model.users.Role;
import app.model.users.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Store {
    private static List<User> fakeUsers = new ArrayList<>();
    static {
        Operator operator = new Operator("1", "oper@mail.com");
        Customer customer = new Customer("2", "cust@mail.com");
        fakeUsers.add(operator);
        fakeUsers.add(customer);
    }

    public static User getUserByEmail(String email) {
        Optional<User> optional = fakeUsers.stream().filter(u -> u.getEmail().equals(email)).findFirst();
        if (optional.isPresent()) {
            User user = optional.get();
            Role role = user.getRole();
            user.setRole(role);
            return role == Role.Operator ? new Operator(user) : new Customer(user);
        } else {
            return null;
        }
    }
}
