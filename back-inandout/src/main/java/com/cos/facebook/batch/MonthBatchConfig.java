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
public class MonthBatchConfig {

	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
	public StepBuilderFactory stepBuilderFactory;
	
	
	@Bean public Job monthJob(){
		return jobBuilderFactory.get("monthJob")
								.start(monthStep())
								.build();
	}
	
	@Bean
	@JobScope
	public Step monthStep() {
		return stepBuilderFactory.get("monthStep")
                .tasklet(MonthTasklet())
                .build();
		}
	
	@Bean
    public Tasklet MonthTasklet() {
        return new com.cos.facebook.batch.MonthTasklet();
    }
}
