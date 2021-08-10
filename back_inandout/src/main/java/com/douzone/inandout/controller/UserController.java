package com.douzone.inandout.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.inandout.service.UserService;


@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	// @CrossOrigin : 메서드에 @CrossOrigin을 사용해서 cors정책을 풀 수 있다 .WebConfig에서 설정했기때문에 생략
	@GetMapping("/user/{no}")
	public ResponseEntity<?> test(@PathVariable int no) {
		return new ResponseEntity<>(userService.findByNo(no), HttpStatus.OK);	// 응답(Response)에 해당하는 HttpHeader와 HttpBody를 포함하는 클래스
	}
	
	@GetMapping("/user/list")
	public ResponseEntity<?> list() { 
		return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);	//200
	}	
}