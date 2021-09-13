package com.cos.facebook.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.controller.AlarmController;
import com.cos.facebook.dto.LeavesReqDto;
import com.cos.facebook.dto.leave.LeaveAddReqDto;
import com.cos.facebook.dto.leave.LeaveUpdateReqDto;
import com.cos.facebook.model.Alarm;
import com.cos.facebook.model.Leaves;
import com.cos.facebook.model.OnOff;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.AlarmRepository;
import com.cos.facebook.repository.LeavesRepository;
import com.cos.facebook.repository.OnOffRepository;
import com.cos.facebook.repository.UserRepository;

@Service
public class LeavesService {
	
	@Autowired
	private LeavesRepository leavesRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OnOffRepository onOffRepository;
	
	@Autowired
	private AlarmRepository alarmRepository;
	
	@Autowired
	private AlarmController alarmController;
	
	public List<Leaves> findAll() {
		return leavesRepository.findAll();
	}
	
	public List<Leaves> findByNo(int no, long id) {
		String category = "";
		if(no == 1) {
			return leavesRepository.findByNo1(id);
		} else if(no == 12) {
			 return leavesRepository.findByNo12(id);
		} else if(no == 13) {
			 return leavesRepository.findByNo13(id);
		} else if(no == 14) {
			 return leavesRepository.findByNo14(id);
		} else if(no == 123) {
			 return leavesRepository.findByNo123(id);
		} else if(no == 124) {
			 return leavesRepository.findByNo124(id);
		} else if(no == 134) {
			 return leavesRepository.findByNo134(id);
		} else if(no == 2) {
			category = "연차";
			return leavesRepository.findByNo2(category);
		} else if(no == 3) {
			 category = "출장";
		} else if(no == 4) {
			 category = "외근";
		} else if(no == 34) {
			 return leavesRepository.findByNo34();
		} else if(no == 234) {
			 return leavesRepository.findByNo234();
		} else if(no == 23) {
			 return leavesRepository.findByNo23();
		} else if(no == 24) {
			 return leavesRepository.findByNo24();
		} else if(no == 1234) {
			 return leavesRepository.findAll();
		}
		return leavesRepository.findByNo(category);
	}
	
	// 휴가 삭제 시 휴가 개수 복구
	public void delete(int id) {
		Leaves leavesEntity = leavesRepository.findById(id).get();
		System.out.println("leavesEntity : " + leavesEntity);
		
		long leaveTime = leavesEntity.getToDate().getTime() - leavesEntity.getFromDate().getTime(); 
		long leaveDay = leaveTime / (24 *60*60*1000);
		
		System.out.println("leaveDay :" + leaveDay);
		// 휴가 신청 한 유저 찾고 +시키기
		User userEntity = userRepository.findById(leavesEntity.getUser().getId()).get();
				
		if(leavesEntity.getCategory().equals("연차")) {
			userEntity.setALeave(userEntity.getALeave() + (leaveDay+1));
		}
		if(leavesEntity.getCategory().equals("오전 반차")) {
			userEntity.setALeave(userEntity.getALeave() + (leaveDay+0.5));
		}
		if(leavesEntity.getCategory().equals("오후 반차")) {
			userEntity.setALeave(userEntity.getALeave() + (leaveDay+0.5));
		}
		
		userRepository.save(userEntity);
		leavesRepository.deleteById(id);
		
		Alarm alarmEntitiy = new Alarm();
		alarmEntitiy.setMessage(leavesEntity.getCategory());
		alarmEntitiy.setFromUser(leavesEntity.getFromUser());
		alarmEntitiy.setUser(leavesEntity.getUser());
		alarmEntitiy.setState(true);
		alarmRepository.save(alarmEntitiy);
		alarmController.SendTemplateMessage3(leavesEntity);
		
		alarmController.SendToMessage2();
	}
	
	public Leaves add(LeaveAddReqDto leaveAddReqDto, String username) {
		User userEntity = userRepository.findByUsername(username);
		User doctoryEntity = userRepository.findById(Long.parseLong(leaveAddReqDto.getFromUser())).get();
		
		Leaves leavesEntity = new Leaves();
		leavesEntity.setCategory(leaveAddReqDto.getCategory());
		leavesEntity.setContent(leaveAddReqDto.getContent());
		leavesEntity.setToDate(leaveAddReqDto.getToDate());
		leavesEntity.setFromDate(leaveAddReqDto.getFromDate());
		leavesEntity.setState(leaveAddReqDto.getState());
		leavesEntity.setUser(userEntity);
		leavesEntity.setFromUser(doctoryEntity);
		
		System.out.println("===================");
		System.out.println(leavesEntity);
				
		Alarm alarmEntitiy = new Alarm();
		alarmEntitiy.setMessage(leaveAddReqDto.getCategory());
		alarmEntitiy.setFromUser(userEntity);
		alarmEntitiy.setUser(doctoryEntity);
		alarmEntitiy.setState(true);
		alarmRepository.save(alarmEntitiy);
		
		alarmController.SendTemplateMessage(leavesEntity);
		alarmController.SendToMessage2();
		
		return leavesRepository.save(leavesEntity);
	}
	
	public Leaves add2(LeaveAddReqDto leaveAddReqDto, String username) {
		User userEntity = userRepository.findByUsername(username);
		User doctoryEntity = userRepository.findById(Long.parseLong(leaveAddReqDto.getFromUser())).get();
		
		Leaves leavesEntity = new Leaves();
		leavesEntity.setCategory(leaveAddReqDto.getCategory());
		leavesEntity.setContent(leaveAddReqDto.getContent());
		leavesEntity.setToDate(leaveAddReqDto.getToDate());
		leavesEntity.setFromDate(leaveAddReqDto.getFromDate());
		leavesEntity.setState(leaveAddReqDto.getState());
		leavesEntity.setUser(userEntity);
		leavesEntity.setFromUser(doctoryEntity);
		
		Leaves leaves = leavesRepository.save(leavesEntity);
		alarmController.SendToMessage2();
		
		return leaves;
	}

	public List<Leaves> getLeavesByDoctor(long doctorId) {
		return leavesRepository.findByDoctorId(doctorId);
	}

	public void leaveUpdate(LeaveUpdateReqDto leaveUpdateReqDto) {
		Leaves leaveEntity = leavesRepository.findById(leaveUpdateReqDto.getNo()).get();
		leaveEntity.setState(leaveUpdateReqDto.getState());
		
		if(leaveUpdateReqDto.getState().equals("success")) {
			
			Calendar fromDate = Calendar.getInstance();
			fromDate.setTime(leaveEntity.getFromDate());
			
			Calendar toDate = Calendar.getInstance();
			toDate.setTime(leaveEntity.getToDate());
			
			while(fromDate.compareTo(toDate) != 1) {
				fromDate.add(Calendar.DATE,1);
				OnOff onOffEntity = new OnOff();
				Date d = new Date(fromDate.getTimeInMillis());
				
				onOffEntity.setUser(leaveEntity.getUser());
				onOffEntity.setDate(d);
				onOffEntity.setState(leaveEntity.getCategory());
				onOffRepository.save(onOffEntity);
			}
			
			if(leaveEntity.getCategory().equals("연차")) {
				
				// 두 기간의 차이 구하기
				long leaveTime = leaveEntity.getToDate().getTime() - leaveEntity.getFromDate().getTime(); 
				long leaveDay = leaveTime / (24 *60*60*1000);
				System.out.println("leaveDay : " +leaveDay);
				leaveEntity.getUser().setALeave(leaveEntity.getUser().getALeave()-(leaveDay+1));
			} else {
				leaveEntity.getUser().setALeave(leaveEntity.getUser().getALeave()-0.5);
			}
		}

		leavesRepository.save(leaveEntity);
		
		Alarm alarmEntitiy = new Alarm();
		alarmEntitiy.setMessage(leaveEntity.getCategory());
		alarmEntitiy.setFromUser(leaveEntity.getFromUser());
		alarmEntitiy.setUser(leaveEntity.getUser());
		alarmEntitiy.setState(true);
		alarmRepository.save(alarmEntitiy);
		alarmController.SendTemplateMessage2(leaveEntity);
		alarmController.SendToMessage2();
	}

	public void update(LeavesReqDto leavesReqDto) {
		System.out.println("여기 실행됐난ㅁㅇㄹㄴㅁㅇㄹ");
		Leaves leavesEntity = leavesRepository.findById(leavesReqDto.getId()).get();
		leavesEntity.setCategory(leavesReqDto.getCategory());
		leavesEntity.setContent(leavesReqDto.getContent());
		leavesEntity.setFromDate(leavesReqDto.getFromDate());
		leavesEntity.setToDate(leavesReqDto.getToDate());
		leavesRepository.save(leavesEntity);
		
		alarmController.SendTemplateMessage2(leavesEntity);
		Alarm alarmEntitiy = new Alarm();
		alarmEntitiy.setMessage(leavesEntity.getCategory());
		alarmEntitiy.setFromUser(leavesEntity.getFromUser());
		alarmEntitiy.setUser(leavesEntity.getUser());
		alarmEntitiy.setState(true);
		alarmRepository.save(alarmEntitiy);
		alarmController.SendToMessage2();
	}	
}