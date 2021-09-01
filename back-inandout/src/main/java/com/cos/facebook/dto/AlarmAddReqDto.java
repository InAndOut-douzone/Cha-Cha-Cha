package com.cos.facebook.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AlarmAddReqDto {
	private String message;
	private long fromUser;
	private String toUser;
	private boolean state;
}
