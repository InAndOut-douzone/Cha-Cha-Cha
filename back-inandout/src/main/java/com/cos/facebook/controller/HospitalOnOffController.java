package com.cos.facebook.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.dto.HospitalOnOffReqDto;
import com.cos.facebook.service.HospitalOnOffService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class HospitalOnOffController {

	private final HospitalOnOffService hospitalOnOffService;
	
	@PutMapping("/hospitalOnOff")
	public ResponseEntity<?> updateHospital(@RequestBody HospitalOnOffReqDto hospitalOnOffReqDto) {
		hospitalOnOffService.update(hospitalOnOffReqDto);
		// String -> Date 변환
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
//		Date date = sdf.parse(hospitalReqDto.getOnTime());
		 
		return new ResponseEntity<>(HttpStatus.OK);
	}
}