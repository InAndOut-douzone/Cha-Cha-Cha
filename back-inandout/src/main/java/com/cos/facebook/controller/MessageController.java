package com.cos.facebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.model.Message;

@RestController
public class MessageController {
	
	@Autowired 
	private SimpMessagingTemplate webSocket; 
	
	@MessageMapping("/sendTo") 
	@SendTo("/topics/sendTo") 
	public String SendToMessage() throws Exception { 
		return "SendTo"; 
	}
	
	@MessageMapping("/Template") 
	public void SendTemplateMessage() { 
		webSocket.convertAndSend("/topics/template" , "Template"); 
	} 
	
	@RequestMapping(value="/api") 
	public void SendAPI() { 
		webSocket.convertAndSend("/topics/api" , "API"); 
	}

	@MessageMapping("/hello")
    @SendTo("/topic/roomId")
    public Message boradCast(Message message){
        return message;
    }
}