package co.edu.icesi.dev.secproject.backend.controller.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import co.edu.icesi.dev.secproject.backend.logic.UserAuthService;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	/**
	 * User service interface that provides methods to access user data.
	 */
	@Autowired
	private UserAuthService userService;

	/**
	 * provider of JWT methods
	 */
	@Autowired
	private JwtTokenProvider jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String token = getToken(req);
			if (token != null && jwtTokenUtil.validateToken(token)) {
				String username = jwtTokenUtil.getNombreUsuarioFromToken(token);
				UserDetails u = userService.loadUserByUsername(username);

				UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(u, null,
						u.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		} catch (Exception e) {
			logger.error("fail en el método doFilter " + e.getMessage());
		}
		filterChain.doFilter(req, res);
	}

	private String getToken(HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer"))
			return header.replace("Bearer ", "");
		return null;
	}

}
