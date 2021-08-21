package com.cos.facebook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.config.dto.HospitalReqDto;
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

	public void update(HospitalReqDto hospitalReqDto) {
		Hospital hospitalEntity = hospitalRepository.findById(1);
		hospitalEntity.setOnTime(hospitalReqDto.getOnTime());
		hospitalEntity.setOffTime(hospitalReqDto.getOffTime());
		
		Hospital result = hospitalRepository.save(hospitalEntity);
		System.out.println("result" + result);
	}
}
