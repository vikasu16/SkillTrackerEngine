package com.skilltracker.engine.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilltracker.engine.response.AdditionResponse;
import com.skilltracker.engine.response.UserInformationReponse;
import com.skilltracker.engine.response.UserSkillResponse;
import com.skilltracker.engine.services.UserService;
import com.skilltracker.engine.viewmodel.AddSkillViewModel;
import com.skilltracker.engine.viewmodel.UpdateBioViewModel;
import com.skilltracker.engine.viewmodel.UpdateSkillViewModel;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

	private final UserService _userService;
	
	@GetMapping("/getUserDetails")
	public ResponseEntity<UserInformationReponse> GetUserDetails()
	{
		return ResponseEntity.ok(_userService.GetUserDetails());
	}
	
	@PostMapping("/updateBio")
	public ResponseEntity<AdditionResponse> UpdateBio(@RequestBody UpdateBioViewModel updateBioViewModel)
	{
		return ResponseEntity.ok(_userService.UpdateUserBio(updateBioViewModel));
	}
	
	@GetMapping("/getSkills")
	public ResponseEntity<UserSkillResponse> GetSkills()
	{
		return ResponseEntity.ok(_userService.GetUserSkills());
	}
	
	@PostMapping("/addSkill")
	public ResponseEntity<AdditionResponse> AddSkill(@RequestBody AddSkillViewModel addSkillViewModel )
	{
		return ResponseEntity.ok(_userService.AddUserSkill(addSkillViewModel));
	}
	
	@PostMapping("/updateSkill")
	public ResponseEntity<AdditionResponse> UpdateSkill(@RequestBody UpdateSkillViewModel updateSkill )
	{
		return ResponseEntity.ok(_userService.UpdateSkill(updateSkill));
	}
}
