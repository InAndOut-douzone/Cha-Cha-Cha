package com.cos.facebook.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.config.auth.PrincipalDetails;
import com.cos.facebook.dto.AlarmAddReqDto;
import com.cos.facebook.dto.LeavesReqDto;
import com.cos.facebook.dto.leave.LeaveAddReqDto;
import com.cos.facebook.dto.leave.LeaveUpdateReqDto;
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
	
	@GetMapping("/leaves/{no}")
	public ResponseEntity<?> getLeaves(@PathVariable int no, Authentication authentication) {
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		
		return new ResponseEntity<>(leavesService.findByNo(no,principal.getUser().getId()),HttpStatus.OK);
	}
	
	@DeleteMapping("/leaves/{id}")
	public void deleteLeaves(@PathVariable int id) {
		leavesService.delete(id);
	}
	
	@PostMapping("/leave")
	public ResponseEntity<?> addLeave(@RequestBody LeaveAddReqDto leaveAddReqDto, Authentication authentication){
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		System.out.println("principal : " + principal.getUser().getUsername());
		System.out.println("leaveAddReqDto" + leaveAddReqDto);
	
		return new ResponseEntity<>(leavesService.add(leaveAddReqDto,principal.getUser().getUsername()), HttpStatus.OK);
	}
	
	@GetMapping("/leave")
	public ResponseEntity<?> getLeave(Authentication authentication){
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		
		return new ResponseEntity<>(leavesService.getLeavesByDoctor(principal.getUser().getId()), HttpStatus.OK);
	}
	
	@PutMapping("/leave")
	public ResponseEntity<?> updateLeave(@RequestBody LeavesReqDto leavesReqDto){
		leavesService.update(leavesReqDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}	
	
	@PostMapping("/leave/update")
	public ResponseEntity<?> updateState(@RequestBody LeaveUpdateReqDto leaveUpdateReqDto){
		leavesService.leaveUpdate(leaveUpdateReqDto);
		
		return new ResponseEntity<>(HttpStatus.OK);
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