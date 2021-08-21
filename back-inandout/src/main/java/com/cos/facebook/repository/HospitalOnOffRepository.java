package com.cos.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cos.facebook.model.HospitalOnOff;

public interface HospitalOnOffRepository extends JpaRepository<HospitalOnOff, Integer>{

	public HospitalOnOff findByWeek(String week);
}