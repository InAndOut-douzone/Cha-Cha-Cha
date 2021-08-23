package com.cos.facebook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.dto.HospitalOnOffReqDto;
import com.cos.facebook.config.dto.HospitalReqDto2;
import com.cos.facebook.model.Hospital;
import com.cos.facebook.repository.HospitalRepository;

@Service
public class HospitalService {
	
	@Autowired
	private HospitalRepository hospitalRepository;
	
	public Hospital findById() {
		int a = 1;
		return hospitalRepository.findById(a);
	}

}
