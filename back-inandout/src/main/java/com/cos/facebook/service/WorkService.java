package com.cos.facebook.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.model.OnOff;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.OnOffRepository;
import com.cos.facebook.repository.UserRepository;

@Service
public class WorkService {

	@Autowired
	private OnOffRepository workRepository;
	@Autowired
	private UserRepository userRepository;
	
public List<OnOff> findById(long id) { // 기본 일주일 데이터 가져오기
		
		Calendar calendar = Calendar.getInstance(); // 달력 가져오기
		
		calendar.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY); // 이번주 월요일 날짜 구하기
		calendar.set(Calendar.HOUR_OF_DAY,00);
		calendar.set(Calendar.MINUTE, 01);
		Date start = calendar.getTime();
		calendar.add(calendar.DATE,6);
		calendar.set(Calendar.HOUR_OF_DAY,23);
		calendar.set(Calendar.MINUTE, 59);
		Date end = calendar.getTime();
		return workRepository.findAllByDate(id, start, end);
	}
	
	public List<OnOff> findByDate(long id, OnOff data){ // 날짜 선택시 데이터 가져오기
		
		Date start = data.getOnTime();
		Date end = data.getOffTime();
		
		return workRepository.findAllByDate(id, start, end);
		}

	public List<String> getWorkTime(long id) { //기본 이번주 일한 시간 구하기
		
		User user = new User();
		user = userRepository.findById(id).get();
		
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat dayformat = new java.text.SimpleDateFormat("yy년 MM월 dd일");
		SimpleDateFormat timeformat = new java.text.SimpleDateFormat("hh시 mm분");
		
		calendar.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
		Date mon = calendar.getTime();
		String strMon = dayformat.format(mon);
		
		calendar.add(calendar.DATE,6);
		Date sun = calendar.getTime();
		String strSun = dayformat.format(sun);
		
		Date time = workRepository.workTime(id,mon,sun); // 일주일 일한 시간
		String hour = "";
		if (time == null) {
			hour = "0";
		}
		else {
			hour = timeformat.format(time).substring(0,2); // 일주일 일한 시간 string으로 시간만 나오게 정리
		}
		
		String percent = String.format("%.2f",(Double.parseDouble(hour)/52)*100); // percent로 계산
		
		List<String> list = new ArrayList<String>();
		list.add(strMon);
		list.add(strSun);
		list.add(hour);
		list.add(percent);
		list.add(user.getName());
		
		return list; 
	}

}