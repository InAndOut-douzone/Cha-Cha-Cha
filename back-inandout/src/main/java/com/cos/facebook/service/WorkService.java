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
		
		SimpleDateFormat weekformat = new java.text.SimpleDateFormat("yyyy-MM-dd");
		
		calendar.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY); // 이번주 월요일 날짜 구하기
		calendar.set(Calendar.HOUR_OF_DAY,00);
		calendar.set(Calendar.MINUTE, 01);
		Date start = calendar.getTime();
		String strStart=weekformat.format(start);
		
		calendar.add(calendar.DATE,6);
		calendar.set(Calendar.HOUR_OF_DAY,23);
		calendar.set(Calendar.MINUTE, 59);
		Date end = calendar.getTime();
		String strEnd = weekformat.format(end);
		
		return workRepository.findAllByDate(id, strStart, strEnd);
	}
	
	public List<OnOff> findByDate(long id, OnOff data){ // 날짜 선택시 데이터 가져오기
		
		SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
		
		Date start = data.getOnTime();
		Date end = data.getOffTime();
		
		String strStart = format.format(start);
		String strEnd = format.format(end);
		
		return workRepository.findAllByDate(id, strStart, strEnd);
		}

	public List<String> getWorkTime(long id) { //기본 이번주 일한 시간 구하기
		
		User user = new User();
		user = userRepository.findById(id).get();
		
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat weekformat = new java.text.SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat dayformat = new java.text.SimpleDateFormat("yy년 MM월 dd일");
		SimpleDateFormat timeformat = new java.text.SimpleDateFormat("HH시 mm분");
		
		
		calendar.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
		calendar.set(Calendar.HOUR_OF_DAY,01);
		calendar.set(Calendar.MINUTE, 01);
		Date mon = calendar.getTime();
		String strMon = dayformat.format(mon);
		
		calendar.add(calendar.DATE,6);
		calendar.set(Calendar.HOUR_OF_DAY,23);
		calendar.set(Calendar.MINUTE, 59);
		Date sun = calendar.getTime();
		String strSun = dayformat.format(sun); 
		
		String strStart = weekformat.format(mon);
		String strEnd = weekformat.format(sun);
		String time = workRepository.workTime(id,strStart,strEnd); // 일주일 일한 시간
		
		String hour = "";
		if (time == null) {
			hour = "0";
		}
		else {
			hour = time;
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