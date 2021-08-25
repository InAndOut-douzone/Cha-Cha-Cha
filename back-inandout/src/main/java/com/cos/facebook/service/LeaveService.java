package com.cos.facebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cos.facebook.dto.leave.LeaveAddReqDto;
import com.cos.facebook.dto.leave.LeaveUpdateReqDto;
import com.cos.facebook.model.Leaves;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.LeaveRepository;
import com.cos.facebook.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LeaveService {

	private final LeaveRepository leaveRepository;
	private final UserRepository userRepository;
	
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
		
		return leaveRepository.save(leavesEntity);
	}

	public List<Leaves> getLeavesByDoctor(long doctorId) {
		return leaveRepository.findByDoctorId(doctorId);
	}

	public void leaveUpdate(LeaveUpdateReqDto leaveUpdateReqDto) {
		Leaves leaveEntity = leaveRepository.findById(leaveUpdateReqDto.getNo()).get();
		leaveEntity.setState(leaveUpdateReqDto.getState());
		leaveRepository.save(leaveEntity);
	}	
}