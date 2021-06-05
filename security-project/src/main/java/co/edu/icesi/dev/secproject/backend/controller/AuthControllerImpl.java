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
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);
		UserrAuthDTO userDetails = (UserrAuthDTO) authentication.getPrincipal();

		JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
		service.saveLogin(user.getUsername());
		return new ResponseEntity<JwtDto>(jwtDto, HttpStatus.OK);
	}

}
