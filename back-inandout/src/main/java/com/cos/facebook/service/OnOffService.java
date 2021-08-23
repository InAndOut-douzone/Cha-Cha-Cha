package com.cos.facebook.service;


import java.time.LocalTime;
import java.util.Date;

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

	public OnOff insertOnTime(String username) {
		User userEntity = userRepository.findByUsername(username);
	
		OnOff onOffEntity = new OnOff();
		onOffEntity.setDate(new Date());
		onOffEntity.setOnTime(new Date());
		onOffEntity.setUser(userEntity);
		return onOffRepository.save(onOffEntity);
	}
}
