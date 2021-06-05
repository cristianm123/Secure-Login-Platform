package co.edu.icesi.dev.secproject.backend.dtos;

public class UserrStdInDTO {

	private String username;
	private String password;

	public UserrStdInDTO(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public String getUsername() {
		return username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
