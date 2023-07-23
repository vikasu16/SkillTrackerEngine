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
public class SkillResponse {
	@JsonProperty("skill_id")
	private Integer skillId;
	
	@JsonProperty("skill_name")
	private String name;
}
