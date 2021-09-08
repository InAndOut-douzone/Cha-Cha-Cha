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

import com.cos.facebook.model.OnOff;
import com.cos.facebook.model.User;
import com.cos.facebook.repository.OnOffRepository;
import com.cos.facebook.repository.UserRepository;

public class MonthTasklet implements Tasklet, StepExecutionListener {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OnOffRepository onOffRepository;
	
	List<User> users = new ArrayList<User>();
	List<Long> ids = new ArrayList<Long>();
	String month = null;
	
	@Override
	public void beforeStep(StepExecution stepExecution) { // before listener
		
		users = userRepository.findMonthUser();
		for(User user : users) {  // 1달 이상 근무한 user id만 리스트로 뽑아둔다.
			ids.add(user.getId());
		}
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
		month = LocalDateTime.now().format(formatter); // 이번달 string으로 변환

	}

	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
	
		return null;
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
		
		for(Long id : ids) { // 각 사원마다 for문 실행
		
			boolean leave = true;
			User user = userRepository.findById2(id);
			List<OnOff> works = onOffRepository.findByIdAndDateList(id, month);
			
			for(OnOff work : works) {
				if(work.getState()=="지각" || work.getState()=="결근") { // 저번달에 지각이나 결근이 있었다면 월차지급 = false
					leave = false;
					break;
				}
			}
			
			if(leave && user.getALeave()==null) { // 저번달 만근하고 연차가 없는 직원 일 경우
				user.setMLeave(1.0); // 월차 1로 지급 ( 안쓰면 사라지기때문에 이전 데이터 상관없음 )
				userRepository.save(user);
			}
		}
		
		return null;
	}

}
