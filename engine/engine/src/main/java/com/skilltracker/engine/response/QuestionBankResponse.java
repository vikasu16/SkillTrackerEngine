package com.skilltracker.engine.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionBankResponse {
	private Integer questionid;
	private String skillname;
	private String level;
	private String link;
	private boolean  isimportant;
	private boolean issolved;
}
