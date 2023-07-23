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
public class UserInformationReponse {
	@JsonProperty("user_name")
	private String username;
	@JsonProperty("user_bio")
	private String bio;
	@JsonProperty("user_fullname")
	private String fullname;
	@JsonProperty("user_firstinital")
	private String inital;
}
