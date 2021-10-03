package com.cos.facebook.batch;

import java.util.HashMap;
import java.util.Map;

import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Schedule {

	@Autowired
    private JobLauncher jobLauncher;
	
	@Autowired
	private final DayBatchConfig dayBatch;
	
	@Autowired
	private final MonthBatchConfig monthBatch;
	
	@Autowired
	private final YearBatchConfig yearBatch;
	
    @Scheduled(cron="00 12 11 * * *") // 매일 00초 57분 23시 마다 실행됨  
    public void dayJob () {
    	
    	 Map<String, JobParameter> confMap = new HashMap<>();
         confMap.put("time", new JobParameter(System.currentTimeMillis()));
         JobParameters jobParameters = new JobParameters(confMap);

    	try {
			jobLauncher.run(dayBatch.dayJob(), jobParameters); //job 실행
			System.out.println("*******");			
			
		} catch (JobExecutionAlreadyRunningException | JobRestartException | JobInstanceAlreadyCompleteException
				| JobParametersInvalidException e) {
			e.printStackTrace();
		}
  
    }
    
    @Scheduled(cron="00 57 23 L * *") // 매달 마지막 날 00초 57분 23시 마다 실행됨  
    public void monthJob () {
    	
    	 Map<String, JobParameter> confMap = new HashMap<>();
         confMap.put("time", new JobParameter(System.currentTimeMillis()));
         JobParameters jobParameters = new JobParameters(confMap);
         
         try {
        	 jobLauncher.run(monthBatch.monthJob(), jobParameters); //job 실행	
        	 
        	 } catch (JobExecutionAlreadyRunningException | JobRestartException | JobInstanceAlreadyCompleteException
        			 | JobParametersInvalidException e) {
        		 e.printStackTrace();
        		 }
  
    }
    
    @Scheduled(cron="00 56 23 31 12 *") // 매년 마지막 날 00초 57분 23시 마다 실행됨  
    public void yearJob () {
    	
    	 Map<String, JobParameter> confMap = new HashMap<>();
         confMap.put("time", new JobParameter(System.currentTimeMillis()));
         JobParameters jobParameters = new JobParameters(confMap);
         
         try {
        	 jobLauncher.run(yearBatch.yearJob(), jobParameters); //job 실행	
        	 
        	 } catch (JobExecutionAlreadyRunningException | JobRestartException | JobInstanceAlreadyCompleteException
        			 | JobParametersInvalidException e) {
        		 e.printStackTrace();
        		 }
  
    }

}