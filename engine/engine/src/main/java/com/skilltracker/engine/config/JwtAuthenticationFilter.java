package com.skilltracker.engine.config;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final UserDetailsService userDetailsService;


	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request, 
			@NonNull HttpServletResponse response, 
			@NonNull FilterChain filterChain)
			throws ServletException, IOException {
		
		final String authHeader = request.getHeader("Authorization");
	    final String jwt;
	    final String userEmail;
	    //if request is not valid
	    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
	      filterChain.doFilter(request, response);
	      return;
	    }
	    jwt = authHeader.substring(7);
	    //fetched username from jwt token from the claims body
	    userEmail = jwtService.extractUserName(jwt);
	    if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null)
	    {
	    	//used interface method for fetching the user details on the base of useremail
	    	UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
	    	//check if the token is valid or not
	    	if(jwtService.IsTokenValid(jwt, userDetails))
	    	{
	    		//create authentication token with user deatils
	    		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
	    				userDetails,
	    				null,
	    				userDetails.getAuthorities());
	    		//set extra details in token
	    		authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	    		//update securitycontextholder with our authenticationtoken
	            SecurityContextHolder.getContext().setAuthentication(authToken);
	    	}
	    	//passing the request to next filters
	        filterChain.doFilter(request, response);
	    }
	}

}
