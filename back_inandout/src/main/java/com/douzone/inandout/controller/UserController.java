package com.douzone.inandout.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.inandout.repository.UserRepository;


@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	// @CrossOrigin : 메서드에 @CrossOrigin을 사용해서 cors정책을 풀 수 있다 .WebConfig에서 설정했기때문에 생략
	@GetMapping("/user")
	public ResponseEntity<?> test() {
		return new ResponseEntity<>(userRepository.findByNo(1), HttpStatus.OK);	// 응답(Response)에 해당하는 HttpHeader와 HttpBody를 포함하는 클래스
	}
	
	@GetMapping("/user/list")
	public ResponseEntity<?> list() { 
		return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
	}	
}