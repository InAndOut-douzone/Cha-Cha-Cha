package com.cos.facebook.controller;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.config.auth.PrincipalDetails;
import com.cos.facebook.model.OnOff;
import com.cos.facebook.service.WorkService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class WorkController {

	private final WorkService workService;
	
	@GetMapping("/work")
	public ResponseEntity<?> getWork(Authentication authentication) {
		
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		
		long id = principal.getUser().getId();
		return new ResponseEntity<>(workService.findById(id),HttpStatus.OK);
	}
	
	@PostMapping("/workdate")
	public ResponseEntity<?> getWorkByDate(@RequestBody OnOff data, Authentication authentication) {
		System.out.println("******** "+data);
		
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		long id = principal.getUser().getId();
		
		return new ResponseEntity<>(workService.findByDate(id, data),HttpStatus.OK);
	}
}
