package com.cos.facebook.dto.holiday;

import java.util.Date;

import lombok.Data;

@Data
public class HolidayReqDto {

	private Date holiday;
	private String content;
}
