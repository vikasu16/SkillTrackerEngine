package com.skilltracker.engine.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistertionResponse {
	
	@JsonProperty("success_information")
	private boolean IsSuccess;
	@JsonProperty("user_exists")
	private boolean IsUserExits;
}
