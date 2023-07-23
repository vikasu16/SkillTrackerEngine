package com.skilltracker.engine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilltracker.engine.entity.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer>{

}
