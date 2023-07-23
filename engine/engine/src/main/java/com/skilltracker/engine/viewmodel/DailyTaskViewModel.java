package com.skilltracker.engine.viewmodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DailyTaskViewModel {
	private String topic;
	private String timespend;
	private String description;
}
