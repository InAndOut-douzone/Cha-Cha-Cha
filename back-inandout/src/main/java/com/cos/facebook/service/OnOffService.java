package com.cos.facebook.service;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.model.HospitalOnOff;
import com.cos.facebook.model.OnOff;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.HospitalOnOffRepository;
import com.cos.facebook.repository.OnOffRepository;
import com.cos.facebook.repository.UserRepository;

@Service
public class OnOffService {
	
	@Autowired
	private OnOffRepository onOffRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private HospitalOnOffRepository hospitalRepository;

	public OnOff insertOnTime(long id) {  // 출근기록
		
		User userEntity = userRepository.findById(id).get();
		Date today = new Date();
		SimpleDateFormat day = new SimpleDateFormat("yyyy-MM-dd");
		String dated = day.format(today);
		OnOff onOffEntity = null;
		
		if(onOffRepository.findByIdAndDate(id,dated) != null) { // 오늘날짜의 데이터가 있는지 없는지 검색
			onOffEntity = onOffRepository.findByIdAndDate(id,dated);
			onOffEntity.setOnTime(new Date());
		}else {													// 오늘 데이터가 없으면 오늘날짜와 출근시간으로 데이터 생
			onOffEntity = new OnOff();
			onOffEntity.setDate(new Date());
			onOffEntity.setOnTime(new Date());
			onOffEntity.setUser(userEntity);
		}
		
		SimpleDateFormat week = new SimpleDateFormat("E");  // 오늘 요일 받아오기
		String strWeek = week.format(onOffEntity.getDate());
		
		HospitalOnOff hospitalTime = hospitalRepository.findByWeek(strWeek); // 오늘 요일 출근시간 검색하기
		SimpleDateFormat dateTo = new SimpleDateFormat("HH:mm");
		Date onTime;
		try {
			onTime = dateTo.parse(hospitalTime.getOnTime());
			
			if( !onOffEntity.getOnTime().after(onTime) && onOffEntity.getState()==null) {
				// 오늘요일의 출근시간과 현재 출근시간 비교해서 휴가가 없으면 지각처리
				onOffEntity.setState("지각");
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return onOffRepository.save(onOffEntity);
	}

	public OnOff insertOffTime(long id) { // 퇴근기록
		
		OnOff onOffEntity = onOffRepository.findOnTimeById(id);
		onOffEntity.setOffTime(new Date());
		
		SimpleDateFormat week = new SimpleDateFormat("E");
		String strWeek = week.format(onOffEntity.getDate());
		
		HospitalOnOff hospitalTime = hospitalRepository.findByWeek(strWeek);
		SimpleDateFormat dateTo = new SimpleDateFormat("HH:mm");
		Date offTime;
		try {
			offTime = dateTo.parse(hospitalTime.getOffTime());
			
			if( !onOffEntity.getOffTime().before(offTime) && onOffEntity.getState()==null) {
				
				onOffEntity.setState("조퇴");
			} else if (onOffEntity.getOffTime().before(offTime) && onOffEntity.getState()== null) {
				onOffEntity.setState("정상");
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return onOffRepository.save(onOffEntity);
	}

	public OnOff getOnOff(long id) {
		Date date = new Date();
		// System.out.println("date : " +date);
		 SimpleDateFormat sDate = new SimpleDateFormat("yyyy-MM-dd");
		String dated = sDate.format(date);
		// System.out.println("dated : " + dated);
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