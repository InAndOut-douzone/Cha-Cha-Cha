package com.cos.facebook.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.model.OnOff;
import com.cos.facebook.repository.OnOffRepository;

@Service
public class WorkService {

	@Autowired
	private OnOffRepository workRepository;
	
	public List<OnOff> findById(long id){
		
		return workRepository.findAllById(id);
	}
	
public List<OnOff> findByDate(long id, OnOff data){
	
	Date start = data.getOnTime();
	Date end = data.getOffTime();
	
	return workRepository.findAllByDate(id, start, end);
	}
}