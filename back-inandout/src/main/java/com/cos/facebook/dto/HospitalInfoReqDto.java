package com.cos.facebook.dto;

import java.util.Date;

import lombok.Data;

@Data
public class HospitalInfoReqDto {
	private int no;
	private String name;
	private String address;
	private String ceoName;
	private String logo;
	private String telNum;
}
