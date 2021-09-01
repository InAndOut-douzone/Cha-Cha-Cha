package com.cos.facebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AlarmController {
	
	@Autowired 
	private SimpMessagingTemplate webSocket; 
	
	@MessageMapping("/sendTo") 
	@SendTo("/topics/sendTo") 
	public String SendToMessage() throws Exception { 
		int a = 3;
		SendTemplateMessage(a);
		return "SendTo"; 
	}

//	@MessageMapping("/Template") 
//	public void SendTemplateMessage() { 
//		webSocket.convertAndSend("/topics/template" , "Template"); 
//	}
	
	@MessageMapping("/Template") 
	public void SendTemplateMessage(int a) { 
		webSocket.convertAndSend("/topics/template"+a , "Template"); 
	} 
	
	@RequestMapping(value="/api") 
	public void SendAPI() { 
		webSocket.convertAndSend("/topics/api" , "API"); 
	}

//	@MessageMapping("/hello")
//    @SendTo("/topic/roomId")
//    public Message boradCast(Message message){
//        return message;
//    }
}