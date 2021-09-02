package com.cos.facebook.service;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cos.facebook.dto.user.UserLeaveDateReqUpdateDto;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public void userUpdate(HttpServletRequest request, User user, MultipartFile file, long id) {
		
		User user1 = userRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("없");
		});   
		
		// webapp 경로 
		String abc = request.getServletContext().getRealPath(""); 
		String UPLOAD_PATH = abc+"images";
				
		if(file != null) {
			
			String image = (new Date().getTime())+ "" + (new Random().ints(1000,9999).findAny().getAsInt()); // 파일 이름 날자 + 랜덤으로 설정
			String originName = file.getOriginalFilename();
			String imgExtension = originName.substring(originName.lastIndexOf(".")+1); // 파일 확장자명 알아냄
		
			File fileSave = new File(UPLOAD_PATH, image + "." + imgExtension);
			
			try {
				file.transferTo(fileSave);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			} // 파일저장
			
			user1.setProfile(image +"."+imgExtension);
	
		}
		
		user1.setEmail(user.getEmail());
		user1.setPhone(user.getPhone());
		userRepository.save(user1);
	}

	
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}


	public User save(User user) {
		return userRepository.save(user);
	}


	public List<User> findAll() {
		return userRepository.findAllLive();
	}
	
	public List<User> findLeaveUser() {
		return userRepository.findLeaveUser();
	}


	public User updateRole(long id, String roles) {
		User userEntity = userRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("없");
		});   
		userEntity.setRoles(roles);
		return userRepository.save(userEntity);
	}


	public List<User> getDoctor() {
		String roles = "ROLE_ADMIN";
		return userRepository.findByRoles(roles);
	}

	public User updateLeaveDate(UserLeaveDateReqUpdateDto leaveDateReqUpdateDto ,long id) {
		User userEntity = userRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("없");
		});   
		userEntity.setLeaveDate(leaveDateReqUpdateDto.getLeaveDate());
		
		
		return userRepository.save(userEntity);
	}
}