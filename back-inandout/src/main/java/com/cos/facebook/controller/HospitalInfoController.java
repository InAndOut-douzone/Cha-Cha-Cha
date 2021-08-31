package com.cos.facebook.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cos.facebook.service.HospitalService;

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
	
	@CrossOrigin(origins = {"http://localhost:3000"})
	@PostMapping("/hospital2")
	public ResponseEntity<Object> updateHospital(HttpServletRequest request, MultipartFile file, String hospitalData) {
		
		if(file== null) {
			System.out.println("*************************************");
		}
		hospitalService.update(request, file, hospitalData);

		// String -> Date 변환
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
//		Date date = sdf.parse(hospitalReqDto.getOnTime());
		 
		return new ResponseEntity<Object>("Success",HttpStatus.OK);
	}
	

}