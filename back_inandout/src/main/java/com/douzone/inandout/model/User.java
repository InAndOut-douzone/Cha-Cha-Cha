package com.douzone.inandout.model;

import java.sql.Date;

public class User {
	
	private int no;
	private String name;
	private String role;
	private Date birth;
	private String gender;
	private String phone;
	private Date hireDate;
	private Date leaveDate;
	private String profile;
	private String position;
	private Float mLeave;
	private Float aLeave;
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
	@Override
	public String toString() {
		return "User [no=" + no + ", name=" + name + ", role=" + role + ", birth=" + birth + ", gender=" + gender
				+ ", phone=" + phone + ", hireDate=" + hireDate + ", leaveDate=" + leaveDate + ", profile=" + profile
				+ ", position=" + position + ", mLeave=" + mLeave + ", aLeave=" + aLeave + ", address=" + address
				+ ", email=" + email + "]";
	}	
}