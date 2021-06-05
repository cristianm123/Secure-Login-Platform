package co.edu.icesi.dev.secproject.backend.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import co.edu.icesi.dev.secproject.backend.dtos.UserrAuthDTO;
import co.edu.icesi.dev.secproject.backend.entities.Userr;

@Service
public class UserAuthService implements UserDetailsService {

	@Autowired
	UserrService service;

	/**
	 * Este método se encarga de obtener un usuario dado su username y devolverlo
	 * con su DTO con los detalles necesarios.
	 *
	 * @param username nombre del usuario a consultar.
	 * @throws UsernameNotFoundException lanza esta excepción cuando no se encuentra
	 *                                   al usuario en la base de datos.
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Userr u = service.getUser(username);
		return UserrAuthDTO.build(u);
	}

}
