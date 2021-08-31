package com.cos.facebook.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.config.auth.PrincipalDetails;
import com.cos.facebook.model.Notice;
import com.cos.facebook.repository.NoticeRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/notice")
public class NoticeController {
	
	private final NoticeRepository noticeRepository;
	
	@GetMapping("/home")
	public String home() {
		return "hhh";
	}
	
	@GetMapping("/list")
	public ResponseEntity<?> list() {
		List<Notice> lists = noticeRepository.findAll();
		// System.out.println("lists : " + lists);
		return new ResponseEntity<>(lists,HttpStatus.OK);
	}
	
	@GetMapping("/listFour")
	public ResponseEntity<?> four() {
		List<Notice> lists = noticeRepository.findFour();
		// System.out.println("lists : " + lists);
		return new ResponseEntity<>(lists,HttpStatus.OK);
	}
	
	@GetMapping("/{no}")
	public ResponseEntity<?> notice(@PathVariable long no){
		
		return new ResponseEntity<>(noticeRepository.findByNo(no),HttpStatus.OK);
	}

	@PostMapping("/add")
	public String home(@RequestBody Notice notice, Authentication authentication) {
		// System.out.println("notice : " + notice);
		// System.out.println("authentication : " +authentication);
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		notice.setUser(principal.getUser());
		noticeRepository.save(notice);
		return "redirect:localhost:3000/addNotice";
	}
}