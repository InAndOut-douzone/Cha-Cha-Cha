package com.cos.facebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@MessageMapping("/sendTo") 
	@SendTo("/topics/sendTo") 
	public String SendToMessage() throws Exception { 
		return "SendTo"; 
	}

//	@MessageMapping("/Template") 
//	public void SendTemplateMessage() { 
//		webSocket.convertAndSend("/topics/template" , "Template"); 
//	}
	
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

//	@MessageMapping("/hello")
//    @SendTo("/topic/roomId")
//    public Message boradCast(Message message){
//        return message;
//    }
}