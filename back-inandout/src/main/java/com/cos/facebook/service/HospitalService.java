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
//		hospitalEntity.setOnTime(hospitalReqDto.getOnTime());
//		hospitalEntity.setOffTime(hospitalReqDto.getOffTime());
		
		Hospital result = hospitalRepository.save(hospitalEntity);
		System.out.println("result" + result);
	}
	
	public void update2(HospitalReqDto2 hospitalReqDto2) {
		Hospital hospitalEntity = hospitalRepository.findById(1);
		hospitalEntity.setName(hospitalReqDto2.getName());
		hospitalEntity.setAddress(hospitalReqDto2.getAddress());
		hospitalEntity.setCeoName(hospitalReqDto2.getCeoName());
		hospitalEntity.setLogo(hospitalReqDto2.getLogo());
		hospitalEntity.setTelNum(hospitalReqDto2.getTelNum());
		
		Hospital result = hospitalRepository.save(hospitalEntity);
		System.out.println("result" + result);
	}
}
