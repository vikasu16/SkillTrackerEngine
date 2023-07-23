package com.skilltracker.engine.response;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
	
	@JsonProperty("access_token")
	private String accessToken;	
	@JsonProperty("expiration_time")
	private Date expirationTime;
	@JsonProperty("assigned_time")
	private Date assignedTime;
}
