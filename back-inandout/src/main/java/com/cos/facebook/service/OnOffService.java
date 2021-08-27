package com.cos.facebook.service;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.model.OnOff;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.OnOffRepository;
import com.cos.facebook.repository.UserRepository;

@Service
public class OnOffService {
	
	@Autowired
	private OnOffRepository onOffRepository;
	
	@Autowired
	private UserRepository userRepository;

	public OnOff insertOnTime(long id) {
		User userEntity = userRepository.findById(id).get();
	
		OnOff onOffEntity = new OnOff();
		onOffEntity.setDate(new Date());
		onOffEntity.setOnTime(new Date());
		onOffEntity.setUser(userEntity);
		
		return onOffRepository.save(onOffEntity);
	}

	public OnOff insertOffTime(long id) {
		
		OnOff onOffEntity = onOffRepository.findOnTimeById(id);
		onOffEntity.setOffTime(new Date());
		
		return onOffRepository.save(onOffEntity);
	}

	public OnOff getOnOff(long id) {
		Date date = new Date();
		System.out.println("date : " +date);
		 SimpleDateFormat sDate = new SimpleDateFormat("yyyy-MM-dd");
		String dated = sDate.format(date);
		System.out.println("dated : " + dated);
		return onOffRepository.findByIdAndDate(id, dated);
	}

	public List<OnOff> getWork(long id) {
		return onOffRepository.findAllById(id);
	}

	public List<OnOff> getOnUser() {
		Date date = new Date();
		SimpleDateFormat sDate = new SimpleDateFormat("yyyy-MM-dd");
		String dated = sDate.format(date);
		
		return onOffRepository.findAllByDate(dated);
	}
}