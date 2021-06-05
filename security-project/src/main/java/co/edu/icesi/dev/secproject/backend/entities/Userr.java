package co.edu.icesi.dev.secproject.backend.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the USERR database table.
 * 
 */
@Entity
@NamedQuery(name="Userr.findAll", query="SELECT u FROM Userr u")
public class Userr implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String username;

	private String passw;

	//bi-directional many-to-one association to Login
	@OneToMany(mappedBy="userr")
	private List<Login> logins;

	//bi-directional many-to-one association to Rolee
	@ManyToOne
	private Rolee rolee;

	public Userr() {
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassw() {
		return this.passw;
	}

	public void setPassw(String passw) {
		this.passw = passw;
	}

	public List<Login> getLogins() {
		return this.logins;
	}

	public void setLogins(List<Login> logins) {
		this.logins = logins;
	}

	public Login addLogin(Login login) {
		getLogins().add(login);
		login.setUserr(this);

		return login;
	}

	public Login removeLogin(Login login) {
		getLogins().remove(login);
		login.setUserr(null);

		return login;
	}

	public Rolee getRolee() {
		return this.rolee;
	}

	public void setRolee(Rolee rolee) {
		this.rolee = rolee;
	}

}