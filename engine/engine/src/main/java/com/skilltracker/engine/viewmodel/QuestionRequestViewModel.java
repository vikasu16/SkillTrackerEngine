package com.skilltracker.engine.viewmodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionRequestViewModel {
	
	private Integer skillid;
	private String level;
	private String link;
	private boolean  isimportant;
	private boolean issolved;
}
