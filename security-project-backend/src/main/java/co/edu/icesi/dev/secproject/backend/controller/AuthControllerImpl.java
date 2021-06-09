package co.edu.icesi.dev.secproject.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.icesi.dev.secproject.backend.controller.security.JwtTokenProvider;
import co.edu.icesi.dev.secproject.backend.dtos.JwtDto;
import co.edu.icesi.dev.secproject.backend.dtos.UserrAuthDTO;
import co.edu.icesi.dev.secproject.backend.dtos.UserrStdInDTO;
import co.edu.icesi.dev.secproject.backend.logic.UserrService;

/**
 * Esta clase expone el servicio de autenticación para los usuarios.
 *
 * @author CristianM
 *
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthControllerImpl {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenProvider jwtProvider;

	@Autowired
	UserrService service;

	@PostMapping("/login")
	public ResponseEntity<JwtDto> login(@RequestBody UserrStdInDTO user, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			HttpHeaders headers = new HttpHeaders();
			headers.set("error", "Bad Request");
			return new ResponseEntity<JwtDto>(headers, HttpStatus.BAD_REQUEST);
		}
		// Se pasa el nombre de usuario y contraseña al authenticationManager
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		// Se genera el token si el usuario se logra autenticar
		String jwt = jwtProvider.generateToken(authentication);
		UserrAuthDTO userDetails = (UserrAuthDTO) authentication.getPrincipal();
		// Se guarda el token junto con datos necesarios para el inicio de sesión
		JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
		// Se registra un login para el usuario en la base de datos
		service.saveLogin(user.getUsername());
		return new ResponseEntity<JwtDto>(jwtDto, HttpStatus.OK);
	}

}
