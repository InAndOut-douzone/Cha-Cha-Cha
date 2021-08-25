package com.cos.facebook.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.config.auth.PrincipalDetails;
import com.cos.facebook.dto.leave.LeaveAddReqDto;
import com.cos.facebook.service.LeaveService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LeaveController {
	
	private final LeaveService leaveService;
	
	@PostMapping("/leave")
	public ResponseEntity<?> addLeave(@RequestBody LeaveAddReqDto leaveAddReqDto, Authentication authentication){
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		System.out.println("principal : " + principal.getUser().getUsername());
		System.out.println("leaveAddReqDto" + leaveAddReqDto);
		
		return new ResponseEntity<>(leaveService.add(leaveAddReqDto,principal.getUser().getUsername()), HttpStatus.OK);
	}	
}