package com.cos.facebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.config.auth.PrincipalDetails;
import com.cos.facebook.model.Leaves;
import com.cos.facebook.service.AlarmService;


@RestController
public class AlarmController {
	
	@Autowired 
	private SimpMessagingTemplate webSocket; 
	
	@Autowired 
	private AlarmService alarmService;
	
	// 예시
//	@MessageMapping("/sendTo") 
//	@SendTo("/topics/sendTo") 
//	public String SendToMessage() throws Exception { 
//		System.out.println("실행됨?");
//		return "SendTo"; 
//	}

	// 출근하면 전원 출근 현황 최신화 시키는 소켓
	@MessageMapping("/sendTo") 
	public void SendToMessage() { 
		System.out.println("SendToMessage 실행됨?");
		webSocket.convertAndSend("/topics/sendTo","sendTo"); 
	} 
	
	@MessageMapping("/Template") 
	public void SendTemplateMessage(Leaves leaves) { 
		int no = (int) leaves.getFromUser() .getId();
		System.out.println(no);
		webSocket.convertAndSend("/topics/template"+no, leaves); 
	} 
	
	@RequestMapping(value="/api") 
	public void SendAPI() { 
		webSocket.convertAndSend("/topics/api" , "API"); 
	}
	
	@GetMapping("/api/alarm")
	public ResponseEntity<?> getAlarm(Authentication authentication){
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		return new ResponseEntity<>(alarmService.findAllById(principal.getUser().getId()),HttpStatus.OK);
	}
	
	@PutMapping("/api/alarm")
	public ResponseEntity<?> updateLeave(Authentication authentication){
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		alarmService.update(principal.getUser().getId());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/api/alarm/count")
	public ResponseEntity<?> getAlarmCount(Authentication authentication){
		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
		return new ResponseEntity<>(alarmService.findCount(principal.getUser().getId()),HttpStatus.OK);
	}
	
	@DeleteMapping("/api/alarm/{no}")
	public void alarmDelete(@PathVariable int no) {
		alarmService.alarmDelete(no);
	}
}