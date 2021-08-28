package com.cos.facebook.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class User {	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //번호증가 전략 3가지 Table, auto_increment, Sequence / 기본 전략을 따르겠다
	private long id;
	private String name;	// 사원이름
	private String username;	// 사원번호
	private String password;
	private	String roles; // USER, ADMIN
	private Date birth;
	private String gender;
	private String phone;
	private Date hireDate; // 입사일
	private Date leaveDate; // 퇴사일
	private String profile;
	private String position;
	private Double mLeave; // 월차
	private Double aLeave; // 연차
	private String address;
	private String email;
	
	public List<String> getRoleList(){
		if(this.roles.length() > 0) {
			return Arrays.asList(this.roles.split(","));
		}
		return new ArrayList<>();
	}
}