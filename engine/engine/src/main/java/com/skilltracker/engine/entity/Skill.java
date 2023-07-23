package com.skilltracker.engine.entity;

import java.time.LocalDateTime;
import java.util.List;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "skill")
public class Skill {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "skillId")
	private Integer id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="isRemoved")
	private boolean isRemoved;
	
	@Column(name="createdDate")
	private LocalDateTime createdDate;
	
	@Column(name="lastModifiedate")
	private LocalDateTime lastModifiedate;
	
	@ManyToOne
	@JoinColumn(name = "userId")
	private User user;
	
	@OneToMany(mappedBy = "skill")
	private List<QuestionBank> questions;
	
}
