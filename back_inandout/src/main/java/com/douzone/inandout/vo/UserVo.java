package com.douzone.inandout.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor		// 모든 매개변수 생성자
@NoArgsConstructor		// 기본 생성자
@Data 					// @ToString, @Getter, @Setter ...
public class UserVo {
	
	private int no;
	private String name;
	private String role;		// 권한
	private Date birth;	
	private String gender;
	private String phone;
	private Date hireDate;		// 입사일
	private Date leaveDate;		// 퇴사일
	private String profile;
	private String position;	// 직책
	private Float mLeave;		// 월차
	private Float aLeave;		// 연차
	private String address;
	private String email;

}