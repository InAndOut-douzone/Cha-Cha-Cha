package com.cos.facebook.service;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cos.facebook.model.Hospital;
import com.cos.facebook.repository.HospitalRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class HospitalService {
	
	@Autowired
	private HospitalRepository hospitalRepository;
	
	public Hospital findById() {
		int a = 1;
		return hospitalRepository.findById(a);
	}


	public void update(HttpServletRequest request, MultipartFile file, String hospitalData) {
		Hospital hospitalEntity = hospitalRepository.findById(1);
		
		// webapp 경로
		String abc = request.getServletContext().getRealPath(""); 
		String UPLOAD_PATH = abc+"images";
		System.out.println(UPLOAD_PATH);
		
		try {
			Hospital hospitalInfoReqDto = new ObjectMapper().readValue(hospitalData,Hospital.class); // string 을 user 객체로 바꿈
			
			if(file != null) {
				String image = (new Date().getTime())+ "" + (new Random().ints(1000,9999).findAny().getAsInt()); // 파일 이름 날자 + 랜덤으로 설정
				String originName = file.getOriginalFilename();
				String imgExtension = originName.substring(originName.lastIndexOf(".")+1); // 파일 확장자명 알아냄
			
				File fileSave = new File(UPLOAD_PATH, image + "." + imgExtension);
				file.transferTo(fileSave); // 파일저장
				// zSystem.out.println("*******"+fileSave);
				hospitalEntity.setLogo(image +"."+imgExtension);
			}

			// System.out.println("**********"+hospitalInfoReqDto);
			hospitalEntity.setName(hospitalInfoReqDto.getName());
			hospitalEntity.setAddress(hospitalInfoReqDto.getAddress());
			hospitalEntity.setCeoName(hospitalInfoReqDto.getCeoName());
			hospitalEntity.setTelNum(hospitalInfoReqDto.getTelNum());
			
			System.out.println(hospitalEntity);
			hospitalRepository.save(hospitalEntity);
		} catch(IOException e) {
			e.printStackTrace();
		}
		
		Hospital result = hospitalRepository.save(hospitalEntity);
		System.out.println("result" + result);
	}
}
