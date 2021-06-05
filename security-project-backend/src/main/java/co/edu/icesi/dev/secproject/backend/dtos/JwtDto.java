package co.edu.icesi.dev.secproject.backend.dtos;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class JwtDto {

	private String token;
	private String bearer = "bearer";
	private String username;
	private Collection<? extends GrantedAuthority> authority;

	public JwtDto(String token, String username, Collection<? extends GrantedAuthority> authority) {
		super();
		this.token = token;
		this.username = username;
		this.authority = authority;
	}

	public Collection<? extends GrantedAuthority> getAuthority() {
		return authority;
	}

	public String getBearer() {
		return bearer;
	}

	public String getToken() {
		return token;
	}

	public String getUsername() {
		return username;
	}

	public void setAuthority(Collection<? extends GrantedAuthority> authority) {
		this.authority = authority;
	}

	public void setBearer(String bearer) {
		this.bearer = bearer;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
