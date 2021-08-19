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
public class Schedule {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	
	private Date fromDate;
	private Date toDate;
	private String title;
	private String memo;
	private String category;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;
}