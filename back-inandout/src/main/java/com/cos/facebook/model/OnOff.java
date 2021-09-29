package com.cos.facebook.model;

import java.time.LocalTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class OnOff {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	private String state;
	private Date date;						// 날짜
	private Date onTime; 				// 출근시간
	private Date offTime;				// 퇴근시간
	private String strDate;               // 날짜 문자열변
	private String strOn;               // 출근시간 문자열변환
	private String strOff;              // 퇴근시간 문자열변환
	
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="leaveId")
	private Leaves leaves;
}