package com.cos.facebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.service.OnOffService;

@RestController
@RequestMapping("/api")
public class OnOffController {
	
	@Autowired
	private OnOffService onOffService;

	@GetMapping("/onoff/{username}")
	public ResponseEntity<?> onTime(@PathVariable String username){
		return new ResponseEntity<>(onOffService.insertOnTime(username),HttpStatus.OK);		
	}
}