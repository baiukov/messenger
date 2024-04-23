package me.chatserver.entities;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="users")
public class User {

    @Id
    private String id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "password")
    private String password;

    public User() {
        this.id = UUID.randomUUID().toString();
    }

    public String getID() { return this.id; }
    public String getUserName() { return this.userName; }
    public String getFirstName() { return this.firstName; }
    public String getLastName() { return this.lastName; }
    public String getPassword() { return this.password; }

    public void setID(UUID id) { this.id = id.toString(); }
    public void setUserName(String userName) { this.userName = userName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String secondName) { this.lastName = secondName; }
    public void setPassword(String password) { this.password = password; }

}