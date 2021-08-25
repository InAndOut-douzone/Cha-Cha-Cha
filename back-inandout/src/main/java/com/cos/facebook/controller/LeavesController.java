package com.cos.facebook.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.service.LeavesService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class LeavesController {

	private final LeavesService leavesService;
	
	@GetMapping("/leaves")
	public ResponseEntity<?> getLeaves() {
		return new ResponseEntity<>(leavesService.findAll(),HttpStatus.OK);
	}
	
	@DeleteMapping("/leaves/{no}")
	public void deleteLeaves(@PathVariable int no) {
		leavesService.delete(no);
	}
	
//	@PutMapping("/hospital2")
//	public ResponseEntity<?> updateHospital(@RequestBody HospitalInfoReqDto hospitalInfoReqDto) {
//		hospitalService.update(hospitalInfoReqDto);
//		// String -> Date 변환
////		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
////		Date date = sdf.parse(hospitalReqDto.getOnTime());
//		 
//		return new ResponseEntity<>(HttpStatus.OK);
//	}

}