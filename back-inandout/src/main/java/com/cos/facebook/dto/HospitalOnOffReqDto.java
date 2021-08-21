package com.cos.facebook.dto;

import java.util.Date;

import lombok.Data;

@Data
public class HospitalOnOffReqDto {
	private String week;
	private String onTime;
	private String offTime;
}
