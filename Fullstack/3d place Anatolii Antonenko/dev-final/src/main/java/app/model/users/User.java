package app.model.users;

public abstract class User {
    private String id;
    private String email;
    protected Role role;

    public User(String id, String email) {
        this.id = id;
        this.email = email;
    }

    public User() { }

    public User(User user) {
        this.id = user.id;
        this.email = user.email;
        this.role = user.role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;

        return id.equals(((User) o).id);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (role != null ? role.hashCode() : 0);
        return result;
    }

    public User(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public abstract Role getRole();

    public void setRole(Role role) {
        this.role = role;
    }
}
