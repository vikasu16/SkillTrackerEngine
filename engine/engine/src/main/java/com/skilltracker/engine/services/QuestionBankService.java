package com.skilltracker.engine.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skilltracker.engine.entity.QuestionBank;
import com.skilltracker.engine.entity.Skill;
import com.skilltracker.engine.repository.QuestionBankRepository;
import com.skilltracker.engine.repository.SkillRepository;
import com.skilltracker.engine.response.AdditionResponse;
import com.skilltracker.engine.response.QuestionBankResponse;
import com.skilltracker.engine.viewmodel.QuestionRequestViewModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionBankService {

	private final QuestionBankRepository _questionRepo;
	private final AuthenticationService _authService;
	private final SkillRepository _skillRepo;

	public AdditionResponse AddQuestion(QuestionRequestViewModel viewModel) {
		var userskill = _skillRepo.findById(viewModel.getSkillid()).orElse(null);
		var isSaved = false;
		if (userskill != null) {
			var questionBank = QuestionBank.builder().skill(userskill).level(viewModel.getLevel())
					.link(viewModel.getLink()).IsImportant(viewModel.isIsimportant()).IsSolved(viewModel.isIssolved())
					.CreatedDate(LocalDateTime.now()).build();

			try {
				_questionRepo.save(questionBank);
				isSaved = true;
			} catch (Exception ex) {
				isSaved = false;
			}
		} else {
			isSaved = false;
		}
		return AdditionResponse.builder().isSuccess(isSaved).build();
	}

	public List<QuestionBankResponse> GetQuestions() {
		var user = _authService.getCurrentUser();
		var response = new ArrayList<QuestionBankResponse>();

		for (Skill skill : user.getSkills()) {
			for (QuestionBank question : skill.getQuestions()) {

				var qestionBankResponse = QuestionBankResponse.builder().questionid(question.getId())
						.level(question.getLevel()).skillname(question.getSkill().getName()).link(question.getLink())
						.isimportant(question.isIsImportant()).issolved(question.isIsSolved()).build();

				response.add(qestionBankResponse);
			}
		}
		return response;
	}
}
