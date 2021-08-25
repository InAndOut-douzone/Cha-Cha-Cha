package com.cos.facebook.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cos.facebook.config.auth.PrincipalDetails;
import com.cos.facebook.dto.UserReqRoleUpdateDto;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.UserRepository;
import com.cos.facebook.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {
	
	private final UserRepository userRepository;
	private final UserService userService;
	
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	// Tip : JWT를 사용하면 UserDetailsService를 호출하지 않기 때문에 @AuthenticationPrincipal 사용
	// 불가능.
	// 왜냐하면 @AuthenticationPrincipal은 UserDetailsService에서 리턴될 때 만들어지기 때문이다.

	// 유저 혹은 매니저 혹은 어드민이 접근 가능
	@GetMapping("/user")
	public ResponseEntity<?> getUser(Authentication authentication) {
		
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		
		// System.out.println("principal : " + principal.getUser().getId());
		// System.out.println("principal : " + principal.getUser().getUsername());
		// System.out.println("principal : " + principal.getUser().getPassword());
		User user = userRepository.findByUsername(principal.getUser().getUsername());

		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<?> user(@PathVariable long id){
		return new ResponseEntity<>(userRepository.findById(id),HttpStatus.OK);
	}
	
	@CrossOrigin(origins = {"http://localhost:3000"})
	@PostMapping("/user/update")
	public ResponseEntity<Object> update(MultipartFile file, String userData){
		String UPLOAD_PATH="/Users/jeongin/Documents/InandOut/Cha-Cha-Cha/back-inandout/src/main/webapp/images/";
		
		User user = new User();
		try {
			user= new ObjectMapper().readValue(userData,User.class); // string 을 user 객체로 바꿈
			
			String image = (new Date().getTime())+ "" + (new Random().ints(1000,9999).findAny().getAsInt()); // 파일 이름 날자 + 랜덤으로 설정
			String originName = file.getOriginalFilename();
			String imgExtension = originName.substring(originName.lastIndexOf(".")+1); // 파일 확장자명 알아냄
		
			File fileSave = new File(UPLOAD_PATH, image + "." + imgExtension);
			file.transferTo(fileSave); // 파일저장
			
			user.setProfile(image +"."+imgExtension);
			// System.out.println(image);
		} catch(IOException e) {
			e.printStackTrace();
		}
		
		userService.userUpdate(user);
		return new ResponseEntity<Object>("Success",HttpStatus.OK);

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

	// 관리자 회원가입   
	@PostMapping("/join")
	public String join(@RequestBody User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user.setRoles("ROLE_USER");
		userRepository.save(user);
		return "회원가입완료";
	}
	
	// 유저네임 중복체크
	@GetMapping("/user/usernameCheck/{username}")
	public ResponseEntity<?> usernameCheck(@PathVariable String username) {
		// System.out.println("username" + username);
		return new ResponseEntity<>(userService.findByUsername(username),HttpStatus.OK);
	}
	
	
	// 사원 등록 
	@PostMapping("/user/add")
	public ResponseEntity<?> addEmployee(@RequestBody User user) {
		user.setPassword(bCryptPasswordEncoder.encode("1"));
		return new ResponseEntity<>(userService.save(user),HttpStatus.OK);
	}
	
	// 사원 리스트 
	@GetMapping("/user/list")
	public ResponseEntity<?> getEmployee() {
		return new ResponseEntity<>(userService.findAll(),HttpStatus.OK);
	}
	

	@PutMapping("/user/{id}")
	public ResponseEntity<?> updateRole(@RequestBody UserReqRoleUpdateDto userReqRoleUpdateDto, @PathVariable long id) {
		return new ResponseEntity<>(userService.updateRole(id,userReqRoleUpdateDto.getRoles()),HttpStatus.OK);
	}

	// 의사 리스트 뽑기
	@GetMapping("/user/getdoctor")
	public ResponseEntity<?> getDoctor() {
		return new ResponseEntity<>(userService.getDoctor(),HttpStatus.OK);
	}	
}