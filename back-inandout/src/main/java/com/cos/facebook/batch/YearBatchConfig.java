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
public class YearBatchConfig {

	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
	public StepBuilderFactory stepBuilderFactory;
	
	
	@Bean public Job yearJob(){
		return jobBuilderFactory.get("yearJob")
								.start(yearStep())
								.build();
	}
	
	@Bean
	@JobScope
	public Step yearStep() {
		return stepBuilderFactory.get("yearStep")
                .tasklet(YearTasklet())
                .build();
		}
	
	@Bean
    public Tasklet YearTasklet() {
        return new com.cos.facebook.batch.YearTasklet();
    }
}
