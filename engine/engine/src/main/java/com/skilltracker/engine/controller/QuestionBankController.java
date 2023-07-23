package com.skilltracker.engine.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilltracker.engine.response.AdditionResponse;
import com.skilltracker.engine.response.QuestionBankResponse;
import com.skilltracker.engine.services.QuestionBankService;
import com.skilltracker.engine.viewmodel.QuestionRequestViewModel;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/questionBank")
@RequiredArgsConstructor
public class QuestionBankController {

	private final QuestionBankService _questionBankService;
	
	@GetMapping("/getQuestions")
	public ResponseEntity<List<QuestionBankResponse>> GetQuestions()
	{
		return ResponseEntity.ok(_questionBankService.GetQuestions());
	}
	
	@PostMapping(value = "/saveQuestion")
	public ResponseEntity<AdditionResponse> SaveQuestion(@RequestBody QuestionRequestViewModel viewModel)
	{
		return ResponseEntity.ok(_questionBankService.AddQuestion(viewModel));
	}
	
	@PutMapping(value="/updateIsSolved")
	public void UpdateSolved(Integer questionId)
	{
		
	}
}
