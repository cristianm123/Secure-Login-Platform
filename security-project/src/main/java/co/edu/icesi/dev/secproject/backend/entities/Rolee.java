package co.edu.icesi.dev.secproject.backend.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the ROLEE database table.
 * 
 */
@Entity
@NamedQuery(name="Rolee.findAll", query="SELECT r FROM Rolee r")
public class Rolee implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private long id;

	private String name;

	//bi-directional many-to-one association to Userr
	@OneToMany(mappedBy="rolee")
	private List<Userr> userrs;

	public Rolee() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Userr> getUserrs() {
		return this.userrs;
	}

	public void setUserrs(List<Userr> userrs) {
		this.userrs = userrs;
	}

	public Userr addUserr(Userr userr) {
		getUserrs().add(userr);
		userr.setRolee(this);

		return userr;
	}

	public Userr removeUserr(Userr userr) {
		getUserrs().remove(userr);
		userr.setRolee(null);

		return userr;
	}

}