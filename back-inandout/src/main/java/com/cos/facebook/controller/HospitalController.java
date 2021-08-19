package com.cos.facebook.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.service.HospitalService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class HospitalController {
	private final HospitalService hospitalService;
	
	@GetMapping("/hospital")
	public ResponseEntity<?> getHospital() {
		
		return new ResponseEntity<>(hospitalService.findById(),HttpStatus.OK);
	}
}
