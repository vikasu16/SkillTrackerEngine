package com.skilltracker.engine.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilltracker.engine.entity.QuestionBank;

@Repository
public interface QuestionBankRepository extends JpaRepository<QuestionBank, Integer> {

}
