package com.cos.facebook.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.facebook.model.Leaves;
import com.cos.facebook.repository.LeavesRepository;

@Service
public class LeavesService {
	
	@Autowired
	private LeavesRepository leavesRepository;
	
	public List<Leaves> findAll() {
		return leavesRepository.findAll();
	}
	
	public void delete(int no) {
		leavesRepository.deleteById(no);
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
}
