package com.cos.facebook.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.model.Alarm;
import com.cos.facebook.repository.AlarmRepository;

@Service
public class AlarmService {
	@Autowired
	private AlarmRepository alarmRepository;
	
	public List<Alarm> findAllById(long id) {
		return alarmRepository.findAllById(id);
	}

	public void update(long id) {
		alarmRepository.updateState(id);
	}
	
	public Long findCount(long id) {
		return alarmRepository.findCount(id);
	}
	
	public void alarmDelete(Integer no) {
		alarmRepository.deleteById(no);
	}
}

