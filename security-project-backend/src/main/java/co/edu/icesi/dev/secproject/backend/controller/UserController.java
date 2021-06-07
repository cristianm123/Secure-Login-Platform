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

	@PutMapping("/blank")
	@PreAuthorize("hasAuthority('admin')")
	public ResponseEntity<?> blankPassword(@RequestParam(name = "username") String username) {
		service.blankPassword(username);
		return ResponseEntity.ok(null);
	}

	@PutMapping("/change")
	@PreAuthorize("hasAuthority('regular')")
	public ResponseEntity<String> changePassword(@RequestParam(name = "newPassword") String password) {
		UserrAuthDTO user = (UserrAuthDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		service.changePassword(user.getUsername(), password);
		return ResponseEntity.ok(null);
	}

	@DeleteMapping("/delete")
	@PreAuthorize("hasAuthority('admin')")
	@Transactional
	public ResponseEntity<String> deleteUser(@RequestParam(name = "username") String username) {
		service.removeUser(username);
		return ResponseEntity.ok(null);
	}

	@GetMapping("/get")
	@PreAuthorize("hasAuthority('admin')")
	public ResponseEntity<List<String>> findAllUsers() {
		return new ResponseEntity<List<String>>(service.findAll(), HttpStatus.OK);
	}

	@GetMapping("/get/login")
	@PreAuthorize("hasAuthority('regular')")
	public ResponseEntity<LocalDateTime> getLastLogin() {
		UserrAuthDTO user = (UserrAuthDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return new ResponseEntity<LocalDateTime>(service.getLastLogin(user.getUsername()), HttpStatus.OK);
		// return service.getLastLogin(user.getUsername());
	}
}
