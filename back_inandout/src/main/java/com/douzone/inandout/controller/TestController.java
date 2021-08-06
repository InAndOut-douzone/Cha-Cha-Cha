package com.douzone.inandout.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.inandout.model.User;
import com.douzone.inandout.repository.UserRepository;

@RestController
public class TestController {

	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/test")
	public String home() {
		User user = userRepository.findByNo(1);
		System.out.println("user" + user);
		return "test"; 
	}
}