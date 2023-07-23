package com.skilltracker.engine.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

import jakarta.persistence.Column;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "question")
public class QuestionBank {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "questionId")
	private Integer Id;
	
	@ManyToOne
	@JoinColumn(name = "skillId")
	private Skill skill;
	
	@Column(name = "level")
	private String level;
	
	@Column(name = "link")
	private String link;
	
	@Column(name = "isImportant")
	private boolean  IsImportant;
	
	@Column(name = "isSolved")
	private boolean IsSolved;

	@Column(name = "createdDate")
	private LocalDateTime CreatedDate;
	
	@Column(name = "lastModifiedDate")
	private LocalDateTime lastModifiedDate;

//	@ManyToOne
//	@JoinColumn(name = "userid")
//	private User UserDetails;
}
