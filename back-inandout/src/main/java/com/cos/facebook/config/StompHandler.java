//package com.cos.facebook.config;
//
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.stereotype.Component;
//
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@Component
//public class StompHandler implements ChannelInterceptor {
//	
//	private final JwtTokenProvider jwtTokenProvider;
//
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//        if(accessor.getCommand() == StompCommand.CONNECT) {
//            if(!jwtTokenProvider.validateToken(accessor.getFirstNativeHeader("token")))
//                throw new AccessDeniedException("");
//        }
//        return message;
//    }
//}