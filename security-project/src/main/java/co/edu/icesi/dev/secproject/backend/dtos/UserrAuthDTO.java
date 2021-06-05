package co.edu.icesi.dev.secproject.backend.dtos;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import co.edu.icesi.dev.secproject.backend.entities.Userr;

public class UserrAuthDTO implements UserDetails {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public static UserrAuthDTO build(Userr user) {
		Set<SimpleGrantedAuthority> roles = new HashSet<>();
		roles.add(new SimpleGrantedAuthority(user.getRolee().getName()));
		return new UserrAuthDTO(user.getUsername(), user.getPassw(), roles);
	}

	private String username;

	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public UserrAuthDTO(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		this.username = username;
		this.password = password;
		this.authorities = authorities;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
}