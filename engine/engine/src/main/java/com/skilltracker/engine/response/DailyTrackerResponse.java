package com.skilltracker.engine.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DailyTrackerResponse {
	@JsonProperty("date")
	private LocalDate date;
	@JsonProperty("day")
	private String day;
	@JsonProperty("usedtime")
	private String usedtime;
	@JsonProperty("percentageoftimeused")
	private double percentageoftimeused;
}
