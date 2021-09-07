package com.cos.facebook.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Builder;
import lombok.Data;

@Entity
@Data
public class Holiday {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;						
	private Date holiday;			// 휴무일
	private String content;		// 사유
	
	@ManyToOne
	@JoinColumn(name="hospitalNo")
	private Hospital hospital;
}
