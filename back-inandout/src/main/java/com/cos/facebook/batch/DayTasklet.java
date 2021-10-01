package com.cos.facebook.batch;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;

import com.cos.facebook.model.HospitalOnOff;
import com.cos.facebook.model.OnOff;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.HolidayRepository;
import com.cos.facebook.repository.HospitalOnOffRepository;
import com.cos.facebook.repository.OnOffRepository;
import com.cos.facebook.repository.UserRepository;

public class DayTasklet implements Tasklet, StepExecutionListener {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OnOffRepository onOffRepository;
	
	@Autowired
	private HolidayRepository holidayRepository;
	
	@Autowired
	private HospitalOnOffRepository hospitalOnOffRepository;
	
	List<User> users = new ArrayList<User>();
	List<Long> ids = new ArrayList<Long>();
	String today = null;
	
	@Override
	public void beforeStep(StepExecution stepExecution) { // before listener
		
		users = userRepository.findAllLive();
		for(User user : users) {  // user id만 리스트로 뽑아둔다.
			ids.add(user.getId());
		}
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		today = LocalDateTime.now().format(formatter); // 오늘날짜 string으로 변환

	}

	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
		
		return null;
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
		
		Boolean holiday = holidayRepository.findByDate(today) == null ? false : true; // 오늘이 병원지정 휴일이면 true
		
		SimpleDateFormat week = new SimpleDateFormat("E");  // 오늘 요일 받아오기
		String strWeek = week.format(new Date());
		if (strWeek.equals("목")) { strWeek = "Thu"; } 
		if (strWeek.equals("월")) { strWeek = "Mon"; }
		if (strWeek.equals("화")) { strWeek = "Tue"; }
		if (strWeek.equals("수")) { strWeek = "Wed"; }
		if (strWeek.equals("금")) { strWeek = "Fri"; }
		if (strWeek.equals("토")) { strWeek = "Sat"; }
		if (strWeek.equals("일")) { strWeek = "Sun"; }
		
		HospitalOnOff hospitalHoliday = hospitalOnOffRepository.findByWeek(strWeek);
		
		if( hospitalHoliday.getOnTime() == hospitalHoliday.getOffTime()) { // 오늘이 병원 휴무일이면 (주말같은 경우) holiday = false
			holiday = true;
		}
		
		for(Long id : ids) { // 각 사원마다 for문 실행
			// work = onOffRepository.findByIdAndDate(id, today);
			OnOff work = new OnOff();
			
			if(onOffRepository.findByIdAndDate(id, today) == null) { // 출석 데이터가 아예없고 병원지정휴일이 아니면 
				
				if(!holiday) {
					work.setState("결근");
					work.setUser(userRepository.findById2(id));
					work.setDate(new Date());
					onOffRepository.save(work);
				}
			} else if((onOffRepository.findByIdAndDate(id, today).getOffTime() == null && onOffRepository.findByIdAndDate(id, today).getState() == null)
					&& !holiday) { // 퇴근데이터가 없고 병원 지정휴일이 아니면
				
					work = onOffRepository.findByIdAndDate(id,today);
					work.setState("조퇴");
					onOffRepository.save(work);
				}
			
		}
		
		return null;
	}

}
