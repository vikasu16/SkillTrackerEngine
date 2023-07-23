package com.skilltracker.engine.services;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.skilltracker.engine.entity.Skill;
import com.skilltracker.engine.repository.SkillRepository;
import com.skilltracker.engine.repository.UserRepository;
import com.skilltracker.engine.response.AdditionResponse;
import com.skilltracker.engine.response.SkillResponse;
import com.skilltracker.engine.response.UserInformationReponse;
import com.skilltracker.engine.response.UserSkillResponse;
import com.skilltracker.engine.viewmodel.AddSkillViewModel;
import com.skilltracker.engine.viewmodel.UpdateBioViewModel;
import com.skilltracker.engine.viewmodel.UpdateSkillViewModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final AuthenticationService _authService;
	private final SkillRepository _skillRepository;
	private final UserRepository _userRepository;

	public UserInformationReponse GetUserDetails() {
		var user = _authService.getCurrentUser();
		if (user != null) {
			var userDetailsResponse = UserInformationReponse.builder().bio(user.getBioDescription())
					.username(user.getEmail().substring(0, user.getEmail().indexOf('@')))
					.inital(user.getFirstname().substring(0, 1).toUpperCase())
					.fullname(formatName(user.getFirstname()) + " " + formatName(user.getLastname())).build();
			return userDetailsResponse;
		}
		return UserInformationReponse.builder().build();
	}

	public AdditionResponse UpdateUserBio(UpdateBioViewModel updateBio) {
		var isUpdated = false;
		var user = _authService.getCurrentUser();
		if (user != null) {
			try {
				user.setBioDescription(updateBio.getBio());
				_userRepository.save(user);
				isUpdated = true;
			} catch (Exception ex) {
				isUpdated = false;
			}
		}
		return AdditionResponse.builder().isSuccess(isUpdated).build();
	}

	public AdditionResponse AddUserSkill(AddSkillViewModel addSkill) {
		var user = _authService.getCurrentUser();
		var skill = Skill.builder().name(addSkill.getSkillname()).isRemoved(false).createdDate(LocalDateTime.now())
				.user(user).build();
		var isSaved = false;
		if (user != null) {
			try {
				_skillRepository.save(skill);
				isSaved = true;
			} catch (Exception ex) {
				isSaved = false;
			}
		}
		return AdditionResponse.builder().isSuccess(isSaved).build();
	}

	public UserSkillResponse GetUserSkills() {
		var user = _authService.getCurrentUser();
		var skillIterator = user.getSkills().iterator();
		var currentSkills = new ArrayList<SkillResponse>();
		var removedSkills = new ArrayList<SkillResponse>();
		while (skillIterator.hasNext()) {
			var skill = skillIterator.next();
			if (!skill.isRemoved()) {
				currentSkills.add(SkillResponse.builder().skillId(skill.getId()).name(skill.getName()).build());

			} else {
				removedSkills.add(SkillResponse.builder().skillId(skill.getId()).name(skill.getName()).build());
			}
		}
		return UserSkillResponse.builder().activeSkills(currentSkills).removedSkills(removedSkills).build();
	}

	public AdditionResponse UpdateSkill(UpdateSkillViewModel updateSkill) {
		var isUpdated = false;
		try {
			var skill = _skillRepository.findById(updateSkill.getSkillid()).orElse(null);
			if (skill != null) {
				skill.setRemoved(updateSkill.isStatus());
				skill.setLastModifiedate(LocalDateTime.now());
				_skillRepository.save(skill);
				isUpdated = true;
			} else {
				isUpdated = false;

			}
		} catch (Exception ex) {
			isUpdated = false;
		}
		return AdditionResponse.builder().isSuccess(isUpdated).build();
	}

	private String formatName(String name) {
		return name.substring(0, 1).toUpperCase() + (name.length() > 1 ? name.substring(1, name.length()) : "");
	}
}
