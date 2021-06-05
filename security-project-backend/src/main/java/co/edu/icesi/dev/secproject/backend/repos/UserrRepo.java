package co.edu.icesi.dev.secproject.backend.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.edu.icesi.dev.secproject.backend.entities.Userr;

public interface UserrRepo extends CrudRepository<Userr, String> {

	@Query("SELECT u.username FROM Userr u")
	List<String> findAllUsernames();
}
