package com.cos.facebook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.dto.HospitalInfoReqDto;
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

	public void update(HospitalInfoReqDto hospitalInfoReqDto) {
		Hospital hospitalEntity = hospitalRepository.findById(1);
		hospitalEntity.setName(hospitalInfoReqDto.getName());
		hospitalEntity.setAddress(hospitalInfoReqDto.getAddress());
		hospitalEntity.setCeoName(hospitalInfoReqDto.getCeoName());
		hospitalEntity.setLogo(hospitalInfoReqDto.getLogo());
		hospitalEntity.setTelNum(hospitalInfoReqDto.getTelNum());

		Hospital result = hospitalRepository.save(hospitalEntity);
		System.out.println("result" + result);
	}
}
