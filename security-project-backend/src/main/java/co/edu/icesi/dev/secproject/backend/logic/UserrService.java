package co.edu.icesi.dev.secproject.backend.logic;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import co.edu.icesi.dev.secproject.backend.entities.Login;
import co.edu.icesi.dev.secproject.backend.entities.Userr;
import co.edu.icesi.dev.secproject.backend.repos.LoginRepo;
import co.edu.icesi.dev.secproject.backend.repos.UserrRepo;

@Service
public class UserrService {

	@Autowired
	UserrRepo userRepo;

	@Autowired
	LoginRepo loginRepo;

	@Autowired
	PasswordEncoder passEnc;

	public void blankPassword(String username) {
		Userr u = userRepo.findById(username).get();
		// Pone la contraseña como un espacio en blanco
		u.setPassw(" ");
		userRepo.save(u);

	}

	public void changePassword(String username, String password) {
		Userr u = userRepo.findById(username).get();
		// Se codifica la contraseña nueva para guardarla en la base de datos.
		String securePassword = passEnc.encode(password);
		u.setPassw(securePassword);
		userRepo.save(u);
	}

	public List<String> findAll() {

		return userRepo.findAllUsernames();
	}

	public LocalDateTime getLastLogin(String username) {

		Date d = loginRepo.findLastLoginByUser(userRepo.findById(username).get());
		LocalDateTime l = Instant.ofEpochMilli(d.getTime()).atZone(ZoneId.systemDefault()).toLocalDateTime();
		return l;
	}

	public Userr getUser(String username) {

		return userRepo.findById(username).get();
	}

	public void removeUser(String username) {
		loginRepo.deleteByUserr(userRepo.findById(username).get());
		userRepo.deleteById(username);
	}

	public void saveLogin(String username) {
		Login log = new Login();
		log.setUserr(userRepo.findById(username).get());
		// Se crea una nueva fecha con la fecha y hora actual y se guarda en la base de
		// datos.
		log.setTimee(new Date());
		loginRepo.save(log);
	}
}
