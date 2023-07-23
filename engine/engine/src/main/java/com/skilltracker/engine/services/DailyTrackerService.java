package com.skilltracker.engine.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.skilltracker.engine.entity.DailyTracker;
import com.skilltracker.engine.repository.DailyTrackerRepository;
import com.skilltracker.engine.response.AdditionResponse;
import com.skilltracker.engine.response.DailyTrackerResponse;
import com.skilltracker.engine.viewmodel.DailyTaskByDateViewModel;
import com.skilltracker.engine.viewmodel.DailyTaskViewModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DailyTrackerService {

	private final DailyTrackerRepository _dailyRepo;
	private final AuthenticationService _authService;

	public AdditionResponse addTracker(DailyTaskViewModel dailyTaskViewModel) {
		var user = _authService.getCurrentUser();
		var isadded = false;
		var task = DailyTracker.builder().createddate(LocalDate.now()).user(user).topic(dailyTaskViewModel.getTopic())
				.timespend(dailyTaskViewModel.getTimespend()).description(dailyTaskViewModel.getDescription()).build();
		try {
			_dailyRepo.save(task);
			isadded = true;
		} catch (Exception ex) {
			isadded = false;
		}
		return AdditionResponse.builder().isSuccess(isadded).build();
	}

	public List<DailyTrackerResponse> getTaskBetweenDateRange(DailyTaskByDateViewModel _timeframe) {
		var user = _authService.getCurrentUser();
		var startDate = LocalDate.parse(_timeframe.getStartdate());
		var endDate = LocalDate.parse(_timeframe.getEnddate());

		List<LocalDate> dateList = new ArrayList<>();
		LocalDate currentDate = startDate;

		while (!currentDate.isAfter(endDate)) {
			dateList.add(currentDate);
			currentDate = currentDate.plusDays(1);
		}
		List<DailyTrackerResponse> response = new ArrayList<DailyTrackerResponse>();

		var tasks = _dailyRepo.getAllTaskBetweenDates(user, startDate, endDate).orElse(null);

		response = dateList.stream().map(perDate -> {
			var completetime = "00:00";
			double percentageSpent = 0;
			var taskPerDay = tasks.stream().filter(task -> task.getCreateddate().equals(perDate))
					.collect(Collectors.toList());
			if (!taskPerDay.isEmpty()) {
				DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
				var totalTimeUsedPerDay = getTimeForTasks(taskPerDay);
				completetime = totalTimeUsedPerDay.format(timeFormatter);
				
				var totalTimeUsedInMinutes  = totalTimeUsedPerDay.getHour() * 60 + totalTimeUsedPerDay.getMinute();
				int totalMinutesInDay = 24 * 60;

		        // Calculate the percentage of the day spent
		        percentageSpent = (double) totalTimeUsedInMinutes / totalMinutesInDay * 100;
		        percentageSpent = BigDecimal.valueOf(percentageSpent).setScale(2, RoundingMode.UP).doubleValue();
			}
			return DailyTrackerResponse.builder().date(perDate)
					.day(perDate.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.getDefault()))
					.usedtime(completetime)
					.percentageoftimeused(percentageSpent).build();
		}).collect(Collectors.toList());

		return response;
	}


	private LocalTime getTimeForTasks(List<DailyTracker> tasks) {
		DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
		LocalTime sumTime = LocalTime.of(0, 0);

		for (var task : tasks) {
			String strtime = task.getTimespend();
			LocalTime time = LocalTime.parse(strtime, timeFormatter);
			sumTime = sumTime.plusHours(time.getHour()).plusMinutes(time.getMinute());
		}

		return sumTime;
	}
}
