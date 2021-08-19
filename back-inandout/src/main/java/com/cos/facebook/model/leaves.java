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
public class leaves {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //번호증가 전략 3가지 Table, auto_increment, Sequence / 기본 전략을 따르겠다
	private int no;
	private Date fromDate; // 휴가 시작일
	private Date toDate;	  // 휴가 마감일
	private String state;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;
}
