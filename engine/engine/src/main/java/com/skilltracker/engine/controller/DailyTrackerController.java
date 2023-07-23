package com.skilltracker.engine.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilltracker.engine.response.AdditionResponse;
import com.skilltracker.engine.response.DailyTrackerResponse;
import com.skilltracker.engine.services.DailyTrackerService;
import com.skilltracker.engine.viewmodel.DailyTaskByDateViewModel;
import com.skilltracker.engine.viewmodel.DailyTaskViewModel;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tracker")
@RequiredArgsConstructor
public class DailyTrackerController {
	
	private final DailyTrackerService _dailyTrackerService;
	
	@PostMapping(value = "/getTasksUnderRange")
	public ResponseEntity<List<DailyTrackerResponse>> getUnderRange(@RequestBody DailyTaskByDateViewModel _timeframe)
	{
		return ResponseEntity.ok(_dailyTrackerService.getTaskBetweenDateRange(_timeframe));
	}
	
	@PostMapping(value = "/save")
	public ResponseEntity<AdditionResponse> Save(@RequestBody DailyTaskViewModel viewModel)
	{
		return ResponseEntity.ok(_dailyTrackerService.addTracker(viewModel));
	}
}
