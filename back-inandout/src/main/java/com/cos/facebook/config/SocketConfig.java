package com.cos.facebook.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import lombok.RequiredArgsConstructor;

//@RequiredArgsConstructor
@Configuration
@EnableWebSocketMessageBroker	// stomp 메시징 사용 
public class SocketConfig implements WebSocketMessageBrokerConfigurer {
	
//	private final StompHandler stompHandler; // jwt 토큰 인증 핸들러
	
	@Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/webSocket")
                .setAllowedOrigins("http://localhost:3000")	// 허용 하겠다
                .withSockJS();
    }
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic","/queue");
        registry.setApplicationDestinationPrefixes("/");
    }
}