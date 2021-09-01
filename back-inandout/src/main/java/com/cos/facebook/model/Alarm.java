package com.cos.facebook.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Entity
@Data
public class Alarm {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	private long fromUser;				// 보내는 사람
	 
	@ManyToOne
	@JoinColumn(name="toUser")
	private User user;						// 받는 사람
	
	private String message;
	private boolean state;
	
	@CreationTimestamp	// 자동으로 현재시간이 들어간다.
	private LocalDateTime regDate;
}