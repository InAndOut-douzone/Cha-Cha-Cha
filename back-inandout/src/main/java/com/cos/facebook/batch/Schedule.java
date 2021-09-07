package com.cos.facebook.batch;

import java.util.HashMap;
import java.util.Map;

import org.springframework.batch.core.JobExecution;
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

import com.cos.facebook.config.BatchConfig;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Schedule {

	@Autowired
    private JobLauncher jobLauncher;
	
	@Autowired
	private final BatchConfig batch;
	
    // 5초마다 실행
    @Scheduled(cron="00 * * * * *")
    public void executeJob () {
    	
    	 Map<String, JobParameter> confMap = new HashMap<>();
         confMap.put("time", new JobParameter(System.currentTimeMillis()));
         JobParameters jobParameters = new JobParameters(confMap);

    	try {
			jobLauncher.run(batch.job(), jobParameters);
			System.out.println("*******");
			
		} catch (JobExecutionAlreadyRunningException | JobRestartException | JobInstanceAlreadyCompleteException
				| JobParametersInvalidException e) {
			e.printStackTrace();
		}
  
    }

}