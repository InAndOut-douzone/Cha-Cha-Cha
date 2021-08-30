package com.cos.facebook.dto;

import java.util.Date;

import lombok.Data;

@Data
public class LeavesReqDto {
	private int Id;
	private Date fromDate;
	private Date toDate;
	private String content;
	private String category;
	private String state;
}
