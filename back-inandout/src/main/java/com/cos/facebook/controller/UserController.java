package com.cos.facebook.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.config.auth.PrincipalDetails;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {
	
	private final UserRepository userRepository;
	
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	// Tip : JWT를 사용하면 UserDetailsService를 호출하지 않기 때문에 @AuthenticationPrincipal 사용
	// 불가능.
	// 왜냐하면 @AuthenticationPrincipal은 UserDetailsService에서 리턴될 때 만들어지기 때문이다.

	// 유저 혹은 매니저 혹은 어드민이 접근 가능
	@GetMapping("/user")
	public ResponseEntity<?> getUser(Authentication authentication) {
		
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		
		System.out.println("principal : " + principal.getUser().getId());
		System.out.println("principal : " + principal.getUser().getUsername());
		System.out.println("principal : " + principal.getUser().getPassword());
		User user = userRepository.findByUsername(principal.getUser().getUsername());

		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<?> user(@PathVariable long id){
		return new ResponseEntity<>(userRepository.findById(id),HttpStatus.OK);
	}
	
	// @CrossOrigin : 메서드에 @CrossOrigin을 사용해서 cors정책을 풀 수 있다 .WebConfig에서 설정했기때문에 생략
//	@GetMapping("/user/{no}")
//	public ResponseEntity<?> test(@PathVariable long no) {
//		return new ResponseEntity<>(userRepository.findByNo(no), HttpStatus.OK);	// 응답(Response)에 해당하는 HttpHeader와 HttpBody를 포함하는 클래스
//	}
	
	// 어드민이 접근 가능
	@GetMapping("/admin")
	public List<User> users() {
		return userRepository.findAll();
	}

	@PostMapping("/join")
	public String join(@RequestBody User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user.setRoles("ROLE_USER");
		userRepository.save(user);
		return "회원가입완료";
	}
}
