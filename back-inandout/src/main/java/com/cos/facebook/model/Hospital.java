package com.cos.facebook.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Hospital {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	private String name;
	private String address;
	private String telNum;
	private String logo;
	private String ceoName;
	private String onTime;			// 여는시간
	private String offTime;			// 닫는시간
}