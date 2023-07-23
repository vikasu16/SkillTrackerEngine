package com.skilltracker.engine.entity;

import java.time.LocalDate;
//import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tracker")
public class DailyTracker {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "trackerId")
	private Integer Id;
	
	@Column(name = "topic")
	private String topic;
	
	@Column(name = "timespend")
	private String timespend;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "createdDate")
	private LocalDate createddate;
	
	@ManyToOne
	@JoinColumn(name = "userId")
	private User user;
}
