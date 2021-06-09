package co.edu.icesi.dev.secproject.backend.controller.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import co.edu.icesi.dev.secproject.backend.controller.security.JwtAuthenticationEntryPoint;
import co.edu.icesi.dev.secproject.backend.controller.security.JwtAuthenticationFilter;
import co.edu.icesi.dev.secproject.backend.logic.UserAuthService;
import co.edu.icesi.dev.secproject.backend.utils.PBKDF2Encoder;

/**
 * Clase encargada de la seguridad de la aplicación.
 *
 * @author CristianM
 *
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserAuthService userAuthService;

	@Autowired
	JwtAuthenticationEntryPoint jwtEntryPoint;

	@Override
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userAuthService).passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// Se puede acceder a cualquier recurso de auth sin estar autenticado
		// Para todos los demás recursos, sí debe de estar autenticado.
		http.cors().and().csrf().disable().authorizeRequests().antMatchers("/auth/**").permitAll().anyRequest()
				.authenticated().and().exceptionHandling().authenticationEntryPoint(jwtEntryPoint).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	public JwtAuthenticationFilter jwtTokenFilter() {
		return new JwtAuthenticationFilter();
	}

	// Se usa el algoritmo PBKDF2 para realizar el hashing de las contraseñas.
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new PBKDF2Encoder();
	}

}