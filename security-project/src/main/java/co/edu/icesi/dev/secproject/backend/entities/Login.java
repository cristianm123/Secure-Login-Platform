package co.edu.icesi.dev.secproject.backend.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The persistent class for the LOGIN database table.
 *
 */
@Entity
@NamedQuery(name = "Login.findAll", query = "SELECT l FROM Login l")
public class Login implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "LOGIN_ID_GENERATOR", sequenceName = "LOGIN_ID_SEQ", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LOGIN_ID_GENERATOR")
	private long id;

	@Temporal(TemporalType.DATE)
	private Date timee;

	// bi-directional many-to-one association to Userr
	@ManyToOne
	private Userr userr;

	public Login() {
	}

	public long getId() {
		return this.id;
	}

	public Date getTimee() {
		return this.timee;
	}

	public Userr getUserr() {
		return this.userr;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setTimee(Date timee) {
		this.timee = timee;
	}

	public void setUserr(Userr userr) {
		this.userr = userr;
	}

}