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
	
	public List<Leaves> findByNo(int no, long id) {
		String category = "";
		if(no == 1) {
			return leavesRepository.findByNo3(id);
		} else if(no == 2) {
			category = "연차";
			return leavesRepository.findByNo2(category);
		} else if(no == 3) {
			 category = "출장";
		} else if(no == 4) {
			 category = "외근";
		} else if(no == 31) {
			 category = "출장";
			 return leavesRepository.findByNo31(category);
		} else if(no == 32) {
			 category = "출장";
			 return leavesRepository.findByNo32(category);
		} else if(no == 33) {
			 category = "출장";
			 return leavesRepository.findByNo33(category);
		} else if(no == 34) {
			 return leavesRepository.findByNo34();
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
}
