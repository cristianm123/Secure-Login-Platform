package co.edu.icesi.dev.secproject.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.icesi.dev.secproject.backend.dtos.UserrAuthDTO;
import co.edu.icesi.dev.secproject.backend.logic.UserrService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	UserrService service;

	/**
	 * Este método expone el servicio REST para poner en blanco la contraseña. Solo
	 * puede ser ejecutado por usuarios regulares.
	 *
	 * @param username el nombre de usuario al que se le va a poner en blanco la
	 *                 contraseña
	 * @return
	 */
	@PutMapping("/blank")
	@PreAuthorize("hasAuthority('admin')")
	public ResponseEntity<?> blankPassword(@RequestParam(name = "username") String username) {
		service.blankPassword(username);
		return ResponseEntity.ok(null);
	}

	/**
	 * Este método expone el servicio REST para cambiar la contraseña. Solo puede
	 * ser ejecutado por usuarios regulares.
	 *
	 * @param username el nombre de usuario al que se le va a cambiar la contraseña
	 * @return
	 */
	@PutMapping("/change")
	@PreAuthorize("hasAuthority('regular')")
	public ResponseEntity<String> changePassword(@RequestParam(name = "newPassword") String password) {
		UserrAuthDTO user = (UserrAuthDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		service.changePassword(user.getUsername(), password);
		return ResponseEntity.ok(null);
	}

	/**
	 * Este método expone el servicio REST para eliminar un usuario. Solo puede ser
	 * ejecutado por usuarios admin.
	 *
	 * @param username el nombre de usuario al que se va a eliminar.
	 * @return
	 */
	@DeleteMapping("/delete")
	@PreAuthorize("hasAuthority('admin')")
	@Transactional
	public ResponseEntity<String> deleteUser(@RequestParam(name = "username") String username) {
		service.removeUser(username);
		return ResponseEntity.ok(null);
	}

	/**
	 * Este método expone el servicio REST para consultar todos los nombres de
	 * usuarios en el sistema. Solo puede ser ejecutado por usuarios admin.
	 *
	 * @return
	 */
	@GetMapping("/get")
	@PreAuthorize("hasAuthority('admin')")
	public ResponseEntity<List<String>> findAllUsers() {
		return new ResponseEntity<List<String>>(service.findAll(), HttpStatus.OK);
	}

	/**
	 * Este método expone el servicio REST para consultar la fecha y hora del último
	 * login que realizó el usuario. Solo puede ser ejecutado por usuarios admin.
	 *
	 * @return
	 */
	@GetMapping("/get/login")
	@PreAuthorize("hasAuthority('regular')")
	public ResponseEntity<LocalDateTime> getLastLogin() {
		UserrAuthDTO user = (UserrAuthDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return new ResponseEntity<LocalDateTime>(service.getLastLogin(user.getUsername()), HttpStatus.OK);
	}
}
