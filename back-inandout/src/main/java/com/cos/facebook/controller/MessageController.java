package com.cos.facebook.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.cos.facebook.model.Message;

@RestController
public class MessageController {

	@MessageMapping("/hello")
    @SendTo("/topic/roomId")
    public Message boradCast(Message message){
		System.out.println("메시지 실핼도미??" + message);
        return message;
    }
}
