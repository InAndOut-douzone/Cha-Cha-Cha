package com.cos.facebook.model;

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
public class Leaves {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //번호증가 전략 3가지 Table, auto_increment, Sequence / 기본 전략을 따르겠다
	private int no;
	private Date fromDate; 		// 휴가 시작일
	private Date toDate;	  		// 휴가 마감일
	private String content;  		// 휴가 사유
	private String category; 		// 휴가 종류
	private String state;	  		// 휴가 상태 ( success : 휴가 승인됨 , fail : 휴가 승인안됨, wait : 휴가 승인 대기 중 ) 

	@ManyToOne
	@JoinColumn(name="fromUserId")
	private User fromUser;						// 휴가 승인 내주는 사람
	
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;								// 휴가를 낸 사람
}
