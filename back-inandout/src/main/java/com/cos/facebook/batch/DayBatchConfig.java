package com.cos.facebook.batch;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class DayBatchConfig {

	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
	public StepBuilderFactory stepBuilderFactory;
	
	
	@Bean public Job dayJob(){
		return jobBuilderFactory.get("dayJob")
								.start(dayStep())
								.build();
	}
	
	@Bean
	@JobScope
	public Step dayStep() {
		return stepBuilderFactory.get("dayStep")
                .tasklet(DayTasklet())
                .build();
		}
	
	@Bean
    public Tasklet DayTasklet() {
        return new com.cos.facebook.batch.DayTasklet();
    }
}
