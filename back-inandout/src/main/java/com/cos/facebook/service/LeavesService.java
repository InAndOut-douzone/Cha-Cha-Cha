package com.cos.facebook.service;

import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.dto.LeavesReqDto;
import com.cos.facebook.dto.leave.LeaveAddReqDto;
import com.cos.facebook.dto.leave.LeaveUpdateReqDto;
import com.cos.facebook.model.HospitalOnOff;
import com.cos.facebook.model.Leaves;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.LeavesRepository;
import com.cos.facebook.repository.UserRepository;

@Service
public class LeavesService {
	
	@Autowired
	private LeavesRepository leavesRepository;
	
	@Autowired
	private UserRepository userRepository;
	
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
	
	public void delete(int id) {
		leavesRepository.deleteById(id);
	}

//	public void update(LeavesReqDto leavesReqDto) {
//		Leaves leavesEntity = leavesRepository.findById();
//		leavesEntity.setFromDate(leavesReqDto.getFromDate());
//		leavesEntity.setToDate(leavesReqDto.getToDate());
////		leavesEntity.setContent(leavesReqDto.getContent());
////		leavesEntity.setCategory(leavesReqDto.getCategory());
////		leavesEntity.setState(leavesReqDto.getState());
//
//		Leaves result = leavesRepository.save(leavesEntity);
//		System.out.println("result" + result);
//	}
	
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
		
		return leavesRepository.save(leavesEntity);
	}

	public List<Leaves> getLeavesByDoctor(long doctorId) {
		return leavesRepository.findByDoctorId(doctorId);
	}

	public void leaveUpdate(LeaveUpdateReqDto leaveUpdateReqDto) {
		Leaves leaveEntity = leavesRepository.findById(leaveUpdateReqDto.getNo()).get();
		leaveEntity.setState(leaveUpdateReqDto.getState());
		if(leaveUpdateReqDto.getState().equals("success")) {
			if(leaveEntity.getCategory().equals("연차")) {
				
				// 두 기간의 차이 구하기
				long leaveTime = leaveEntity.getToDate().getTime() - leaveEntity.getFromDate().getTime(); 
				long leaveDay = leaveTime / (24 *60*60*1000);
				leaveEntity.getUser().setALeave(leaveEntity.getUser().getALeave()-(leaveDay+1));
			} else {
				leaveEntity.getUser().setALeave(leaveEntity.getUser().getALeave()-0.5);
			}
		}

		leavesRepository.save(leaveEntity);
	}

	public void update(LeavesReqDto leavesReqDto) {
		Leaves leavesEntity = leavesRepository.findByWeek(leavesReqDto.getNo());
		leavesEntity.setCategory(leavesReqDto.getCategory());
		leavesEntity.setContent(leavesReqDto.getContent());
		leavesRepository.save(leavesEntity);
		
	}	
}