package com.cos.facebook.dto.leave;

import java.util.Date;

import lombok.Data;

@Data
public class LeaveAddReqDto {

	private String category;
	private String content;
	private Date toDate;
	private Date fromDate;
	private String state;
	private String fromUser;	
}