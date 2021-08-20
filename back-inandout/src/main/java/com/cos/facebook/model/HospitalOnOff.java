package com.cos.facebook.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
public class HospitalOnOff {
 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	private String week;
	private String onTime;
	private String offTime;
	
	@ManyToOne
	@JoinColumn(name="hospitalNo")
	private Hospital hospital;
}
