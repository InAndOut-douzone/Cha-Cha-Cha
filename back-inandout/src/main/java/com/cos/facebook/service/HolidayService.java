package com.cos.facebook.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.dto.holiday.HolidayReqDto;
import com.cos.facebook.model.Holiday;
import com.cos.facebook.model.Hospital;
import com.cos.facebook.repository.HolidayRepository;
import com.cos.facebook.repository.HospitalRepository;

@Service
public class HolidayService {
	
	@Autowired
	private HolidayRepository holidayRepository;

	@Autowired
	private HospitalRepository hospitalRepository;

	
	public Holiday add(HolidayReqDto holidayReqDto) {
		Hospital hospitalEntity = hospitalRepository.findById(1);
		
		Holiday holiday = new Holiday();
		holiday.setContent(holidayReqDto.getContent());
		holiday.setHoliday(holidayReqDto.getHoliday());
		holiday.setHospital(hospitalEntity);
		
		return holidayRepository.save(holiday);
	}

	public List<Holiday> findAll() {
		return holidayRepository.findAlOrderBy();
	}
}