package com.skilltracker.engine.services;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilltracker.engine.config.JwtService;
import com.skilltracker.engine.entity.User;
import com.skilltracker.engine.repository.UserRepository;
import com.skilltracker.engine.response.AuthenticationResponse;
import com.skilltracker.engine.response.RegistertionResponse;
import com.skilltracker.engine.viewmodel.AuthenticationRequest;
import com.skilltracker.engine.viewmodel.RegisterViewModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final UserRepository _userRepository;
	private final PasswordEncoder passwordencoder;
	private final JwtService _jwtService;
	private final AuthenticationManager authenticationManager;

	public RegistertionResponse register(RegisterViewModel request) {
		// TODO Auto-generated method stub
		var UserExits = _userRepository.findByEmail(request.getEmail()).orElse(null);
		var progress_info = false;

		if (UserExits == null) {
			var user = User.builder().firstname(request.getFirstname()).lastname(request.getLastname())
					.email(request.getEmail()).password(passwordencoder.encode(request.getPassword()))
					.username(request.getEmail().substring(0, request.getEmail().indexOf('@')))
					.createdDate(LocalDateTime.now()).build();
			try {
				_userRepository.save(user);

				authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
				progress_info = true;
			} catch (Exception ex) {
				progress_info = false;
			}
		} else {
			progress_info = false;
		}
		return RegistertionResponse.builder().IsSuccess(progress_info).IsUserExits(UserExits != null).build();
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		// check if the user is authenticated ie.. if useeemail and password are correct
		// if not throw exception
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		// user is authenticated then fetch user and generate token
		var user = _userRepository.findByEmail(request.getEmail()).orElseThrow();
		var jwtToken = _jwtService.generateToken(user);

		return AuthenticationResponse.builder().accessToken(jwtToken)
				.expirationTime(_jwtService.extractExpiration(jwtToken))
				.assignedTime(new Date())
				.build();
	}

	public User getCurrentUser() {
		var authentication = SecurityContextHolder.getContext().getAuthentication();

		var user = _userRepository.findByEmail(authentication.getName()).orElse(null);
		return user;
	}

}
