package com.douzone.inandout.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.inandout.repository.UserRepository;
import com.douzone.inandout.vo.UserVo;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public UserVo findByNo(int no) {
		return userRepository.findByNo(no);
	}

	public List<UserVo> findAll() {
		return userRepository.findAll();
	}
}
