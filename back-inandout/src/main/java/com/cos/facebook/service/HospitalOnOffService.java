package com.cos.facebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cos.facebook.dto.HospitalOnOffReqDto;
import com.cos.facebook.model.HospitalOnOff;
import com.cos.facebook.repository.HospitalOnOffRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class HospitalOnOffService {

	private final HospitalOnOffRepository hospitalOnOffRepository;
	
	public void update(HospitalOnOffReqDto hospitalOnOffReqDto) {
		HospitalOnOff hospitalOnOffEntity = hospitalOnOffRepository.findByWeek(hospitalOnOffReqDto.getWeek());
		hospitalOnOffEntity.setOnTime(hospitalOnOffReqDto.getOnTime());
		hospitalOnOffEntity.setOffTime(hospitalOnOffReqDto.getOffTime());
		hospitalOnOffRepository.save(hospitalOnOffEntity);
	}

	public List<HospitalOnOff> findAll() {
		return hospitalOnOffRepository.findAll();
	}
}