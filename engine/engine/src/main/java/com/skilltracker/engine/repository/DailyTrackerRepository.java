package com.skilltracker.engine.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skilltracker.engine.entity.DailyTracker;
import com.skilltracker.engine.entity.User;

@Repository
public interface DailyTrackerRepository extends JpaRepository<DailyTracker, Integer> {

	@Query(value = "FROM DailyTracker t " + "WHERE t.user = :user "
			+ "AND t.createddate >= :startDate AND t.createddate <= :endDate")
	Optional<List<DailyTracker>> getAllTaskBetweenDates(@Param("user") User user,
			@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

	@Query(value = "FROM DailyTracker t " + "WHERE t.user = :user " + "AND t.createddate = :date")
	Optional<List<DailyTracker>> findByCreatedDate(@Param("user") User user, @Param("date") LocalDate date);
}
