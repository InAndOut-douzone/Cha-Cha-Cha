package com.cos.facebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.dto.holiday.HolidayReqDto;
import com.cos.facebook.model.Holiday;
import com.cos.facebook.service.HolidayService;

@RestController
@RequestMapping("/api/holiday")
public class HolidayController {

	@Autowired
	private HolidayService holidayService;
	
	@PostMapping("")
	public ResponseEntity<?> add(@RequestBody HolidayReqDto holidayReqDto) {
		return new ResponseEntity<>(holidayService.add(holidayReqDto),HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> findAll() {
		System.out.println("asdfasdfsadf");
		return new ResponseEntity<>(holidayService.findAll(),HttpStatus.OK);
	}
}