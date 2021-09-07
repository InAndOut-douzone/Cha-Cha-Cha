package com.cos.facebook.batch;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;

import com.cos.facebook.model.User;
import com.cos.facebook.repository.OnOffRepository;
import com.cos.facebook.repository.UserRepository;

public class YearTasklet implements Tasklet, StepExecutionListener {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OnOffRepository onOffRepository;
	
	List<User> users = new ArrayList<User>();
	List<Long> ids = new ArrayList<Long>();
	String year = null;
	
	@Override
	public void beforeStep(StepExecution stepExecution) { // before listener
		
		users = userRepository.findYearUser();
		for(User user : users) {  // 1년 이상 근무한 user id만 리스트로 뽑아둔다.
			ids.add(user.getId());
		}
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-");
		year = LocalDateTime.now().format(formatter); // 이번달 string으로 변환

	}

	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
	
		return null;
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
		
		for(Long id : ids) { // 각 사원마다 for문 실행
		
			User user = userRepository.findById2(id);
			double count = onOffRepository.workYear(id,year); // 1년 전체 출근데이터 카운트
			double offdayCount = onOffRepository.offYear(id, year); // 1년 결근 데이터 카운트
			
			if(offdayCount <= count*0.8) { // 출근이 80% 이상이면 연차 15개 지급
				user.setALeave(15.0);
				user.setMLeave(0.0);
				userRepository.save(user);
			}
		}
		
		return null;
	}

}
