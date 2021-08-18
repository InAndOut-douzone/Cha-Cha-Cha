package com.douzone.inandout.vo;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
	
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = birth;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Date getHireDate() {
		return hireDate;
	}
	public void setHireDate(Date hireDate) {
		this.hireDate = hireDate;
	}
	public Date getLeaveDate() {
		return leaveDate;
	}
	public void setLeaveDate(Date leaveDate) {
		this.leaveDate = leaveDate;
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public Float getmLeave() {
		return mLeave;
	}
	public void setmLeave(Float mLeave) {
		this.mLeave = mLeave;
	}
	public Float getaLeave() {
		return aLeave;
	}
	public void setaLeave(Float aLeave) {
		this.aLeave = aLeave;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public List<String> getRoleList(){
		if(this.role.length() > 0) {
			return Arrays.asList(this.role.split(","));
		}
		return new ArrayList<>();
	}
}