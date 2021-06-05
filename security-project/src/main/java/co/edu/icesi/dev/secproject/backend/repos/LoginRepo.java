package co.edu.icesi.dev.secproject.backend.repos;

import java.util.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import co.edu.icesi.dev.secproject.backend.entities.Login;
import co.edu.icesi.dev.secproject.backend.entities.Userr;

public interface LoginRepo extends CrudRepository<Login, Long> {

	void deleteByUserr(Userr user);

	@Query("SELECT MAX(l.timee) FROM Login l WHERE l.userr = :username")
	Date findLastLoginByUser(@Param("username") Userr username);
}
