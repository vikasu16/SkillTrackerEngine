package com.skilltracker.engine.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilltracker.engine.response.AuthenticationResponse;
import com.skilltracker.engine.response.RegistertionResponse;
import com.skilltracker.engine.services.AuthenticationService;
import com.skilltracker.engine.viewmodel.AuthenticationRequest;
import com.skilltracker.engine.viewmodel.RegisterViewModel;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/Auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	  private final AuthenticationService service;
	  
	  @GetMapping("/getAuth")
	  public String Get()
	  {
		  return "hello";
	  }
	  
	  @PostMapping(value = "/register", consumes={"*/*"})
	  public ResponseEntity<RegistertionResponse> register(
	      @RequestBody RegisterViewModel request
	  ) 
	  {
	    return ResponseEntity.ok(service.register(request));
	  }
	  
	  @PostMapping(value = "/authenticate" , consumes={"*/*"})
	  public ResponseEntity<AuthenticationResponse> authenticate(
	      @RequestBody AuthenticationRequest request
	  ) 
	  {
	    return ResponseEntity.ok(service.authenticate(request));
	  }
}
