package com.cos.facebook.batch;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
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
import com.cos.facebook.repository.HolidayRepository;
import com.cos.facebook.repository.OnOffRepository;
import com.cos.facebook.repository.UserRepository;

public class DayTasklet implements Tasklet, StepExecutionListener {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OnOffRepository onOffRepository;
	
	@Autowired
	private HolidayRepository holidayRepository;
	
	List<User> users = new ArrayList<User>();
	List<Long> ids = new ArrayList<Long>();
	String today = null;
	
	@Override
	public void beforeStep(StepExecution stepExecution) {
		
		users = userRepository.findAll();
		for(User user : users) {
			ids.add(user.getId());
		}
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		today = LocalDateTime.now().format(formatter);

	}

	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
	
		return null;
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
		
		Boolean holiday = holidayRepository.findByDate(today) == null ? false : true;
		
		for(Long id : ids) {
			// work = onOffRepository.findByIdAndDate(id, today);
			OnOff work = new OnOff();
			
			if(onOffRepository.findByIdAndDate(id, today) == null && !holiday) {
				work.setState("결근");
				work.setUser(userRepository.findById2(id));
				work.setDate(new Date());
				onOffRepository.save(work);
				System.out.println("3e3333333333"+work);
			}
			
		}
		
		return null;
	}

}
