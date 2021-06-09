package co.edu.icesi.dev.secproject.backend.utils;

import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.springframework.security.crypto.password.PasswordEncoder;

public class PBKDF2Encoder implements PasswordEncoder {

	// Número de iteraciones para realizar el algoritmo.
	private static final int ITERATIONS = 1000;
	// Longitud en bytes de la clave codificada
	private static final int KEY_BYTES = 64;

	// Método auxiliar para pasar de hexadecimal a binario
	private static byte[] fromHex(String hex) {
		byte[] bytes = new byte[hex.length() / 2];
		for (int i = 0; i < bytes.length; i++) {
			bytes[i] = (byte) Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);
		}
		return bytes;
	}

	// Método auxiliar para generar la sal mediante el algoritmo
	// SHA1PseudoRandomNumberGenerator (SHA1PRNG)
	private static byte[] getSalt() {
		SecureRandom sr;
		try {
			sr = SecureRandom.getInstance("SHA1PRNG");
			byte[] salt = new byte[16];
			sr.nextBytes(salt);
			return salt;
		} catch (NoSuchAlgorithmException e) {

			e.printStackTrace();
		}
		return null;
	}

	// Método auxiliar para pasar de binario a hexadecimal
	private static String toHex(byte[] array) {
		BigInteger bi = new BigInteger(1, array);
		String hex = bi.toString(16);
		int paddingLength = (array.length * 2) - hex.length();
		if (paddingLength > 0) {
			return String.format("%0" + paddingLength + "d", 0) + hex;
		} else {
			return hex;
		}
	}

	/**
	 * Este método se encarga de codificar una contraseña plana con el algoritmo
	 * PBKDF2.
	 *
	 * @param rawPassword contraseña a codificar.
	 * @return contraseña codificada.
	 */
	@Override
	public String encode(CharSequence rawPassword) {

		// Convertir la contraseña en arreglo de chars
		char[] chars = rawPassword.toString().toCharArray();
		// Generar sal
		byte[] salt = getSalt();
		// Se crea el encriptor con la contraseña, la sal, el número de iteraciones y la
		// longitud de la clave
		PBEKeySpec spec = new PBEKeySpec(chars, salt, ITERATIONS, KEY_BYTES * 8);
		SecretKeyFactory skf;
		try {
			skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			// Se codifica la clave
			byte[] hash = skf.generateSecret(spec).getEncoded();
			// Se retorna con el formato {iteraciones}:{sal en hexadecimal}:{hash de la
			// contraseña en hexadecimal}
			return ITERATIONS + ":" + toHex(salt) + ":" + toHex(hash);
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {

			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Este método se encarga de verificar si el hash de una contraseña plana
	 * coincide con el hash de alguna contraseña, usando el algoritmo PBKDF2.
	 *
	 * @param rawPassword     contraseña plana
	 * @param encodedPassword contraseña codificada
	 * @return verdadero si coinciden, falso si no
	 */
	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
		// Se recupera el número de iteraciones, la sal y el hash.
		String[] parts = encodedPassword.split(":");
		int iterations = Integer.parseInt(parts[0]);
		// Se pasa de hexadecimal a binario.
		byte[] salt = fromHex(parts[1]);
		byte[] hash = fromHex(parts[2]);

		PBEKeySpec spec = new PBEKeySpec(rawPassword.toString().toCharArray(), salt, iterations, hash.length * 8);
		SecretKeyFactory skf;
		try {
			skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			// Se genera el hash de la contraseña plana
			byte[] testHash = skf.generateSecret(spec).getEncoded();
			// Por medio de XORs, se verifica que los hash de las contraseñas sean iguales
			// byte a byte
			int diff = hash.length ^ testHash.length;
			for (int i = 0; i < hash.length && i < testHash.length; i++) {
				diff |= hash[i] ^ testHash[i];
			}
			// De ser así, la variable diff se mantendrá como 0 y retornará true, de no
			// serlo, retornará false
			return diff == 0;
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {

			e.printStackTrace();
		}
		return false;
	}
}
