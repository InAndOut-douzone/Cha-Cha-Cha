package com.cos.facebook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cos.facebook.model.User;
import com.cos.facebook.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public void userUpdate(User user) {
		
		 long id = 1; // 여기서 현재 로그인 한 유저의 id를 얻어온다.
		User user1 = userRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("없");
		});   

		user1.setProfile(user.getProfile());
		user1.setEmail(user.getEmail());
		user1.setPhone(user.getPhone());
		userRepository.save(user1);
	}

	
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
}