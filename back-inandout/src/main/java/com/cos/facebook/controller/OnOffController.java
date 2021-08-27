package com.cos.facebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.config.auth.PrincipalDetails;
import com.cos.facebook.service.OnOffService;

@RestController
@RequestMapping("/api")
public class OnOffController {
	
	@Autowired
	private OnOffService onOffService;

	@GetMapping("/onoff/{username}")	// 출근
	public ResponseEntity<?> onTime(@PathVariable String username, Authentication authentication){
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		return new ResponseEntity<>(onOffService.insertOnTime(principal.getUser().getId()),HttpStatus.OK);		
	}
	
	@GetMapping("/onoff")
	public ResponseEntity<?> offTime(Authentication authentication){
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		return new ResponseEntity<>(onOffService.insertOffTime(principal.getUser().getId()),HttpStatus.OK);		
	}
	
	@GetMapping("/getonoff")
	public ResponseEntity<?> getOnOff(Authentication authentication){
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		return new ResponseEntity<>(onOffService.getOnOff(principal.getUser().getId()),HttpStatus.OK);		
	}
	
	@GetMapping("/getwork/{id}")
	public ResponseEntity<?> getwork(@PathVariable long id){
		return new ResponseEntity<>(onOffService.getWork(id),HttpStatus.OK);		
	}

	@GetMapping("/onoff/onuser")
	public ResponseEntity<?> getOnUser(){
		return new ResponseEntity<>(onOffService.getOnUser(),HttpStatus.OK);		
	}
}