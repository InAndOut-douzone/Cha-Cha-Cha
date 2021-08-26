package com.cos.facebook.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.config.auth.PrincipalDetails;
import com.cos.facebook.model.OnOff;
import com.cos.facebook.repository.OnOffRepository;
import com.cos.facebook.service.WorkService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class WorkController {

	private final WorkService workService;
	
	@GetMapping("/work") // 기본 일주일 데이터
	public ResponseEntity<?> getWork(Authentication authentication) {
		
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal(); // 로그인 유저정보 가져오
		long id = principal.getUser().getId();
		
		return new ResponseEntity<>(workService.findById(id),HttpStatus.OK);
	}
	@GetMapping("/wokrpercent") // 일주일동안 일한 시간 계산
	public ResponseEntity<?> getWorkTime(Authentication authentication) {
		
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		long id = principal.getUser().getId();
		
		return new ResponseEntity<>(workService.getWorkTime(id),HttpStatus.OK);
	}
	
	@PostMapping("/workdate") // 날짜 지정했을 경우 데이터
	public ResponseEntity<?> getWorkByDate(@RequestBody OnOff data, Authentication authentication) {
		
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		long id = principal.getUser().getId();
		
		return new ResponseEntity<>(workService.findByDate(id, data),HttpStatus.OK);
	}

}
