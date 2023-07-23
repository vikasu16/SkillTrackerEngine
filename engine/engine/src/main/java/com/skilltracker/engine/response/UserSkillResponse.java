package com.skilltracker.engine.response;


import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSkillResponse {
	@JsonProperty("current_skills")
	private ArrayList<SkillResponse> activeSkills;
	
	@JsonProperty("removed_skills")
	private ArrayList<SkillResponse> removedSkills;

}
