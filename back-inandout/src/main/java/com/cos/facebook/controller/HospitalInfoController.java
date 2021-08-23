package com.cos.facebook.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cos.facebook.dto.HospitalInfoReqDto;
import com.cos.facebook.model.User;
import com.cos.facebook.service.HospitalService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class HospitalInfoController {

	private final HospitalService hospitalService;
	
	@GetMapping("/hospital2")
	public ResponseEntity<?> getHospital() {
		return new ResponseEntity<>(hospitalService.findById(),HttpStatus.OK);
	}
	
	@PutMapping("/hospital2")
	public ResponseEntity<?> updateHospital(@RequestBody HospitalInfoReqDto hospitalInfoReqDto) {
		hospitalService.update(hospitalInfoReqDto);
		// String -> Date 변환
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
//		Date date = sdf.parse(hospitalReqDto.getOnTime());
		 
		return new ResponseEntity<>(HttpStatus.OK);
	}
	

}