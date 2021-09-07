package com.cos.facebook.config;

import javax.persistence.EntityManagerFactory;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cos.facebook.model.User;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@AllArgsConstructor
public class BatchConfig {

	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
	public StepBuilderFactory stepBuilderFactory;
	
	@Autowired
	private EntityManagerFactory entityManagerFactory;

	private static final int chunkSize = 10;
	
	@Bean public Job job(){
		return jobBuilderFactory.get("job")
								.start(step1())
								// .next(step2())
								.build();
		
	}
	
	@Bean
	@JobScope
	public Step step1() {
		return stepBuilderFactory.get("Step1")
				.<User, Long>chunk(chunkSize) 
				.reader(hospitalReader())
				.processor(jpaPagingItemProcessor())
                .writer(jpaPagingItemWriter())
                .build();
		}
	
	 @Bean
	    public JpaPagingItemReader<User> hospitalReader() {
	        return new JpaPagingItemReaderBuilder<User>()
	                .name("hospitalReader")
	                .entityManagerFactory(entityManagerFactory) //DataSource가 아닌 EntityManagerFactory를 통한 접근  
	                .pageSize(chunkSize)
	                .queryString("SELECT u FROM User u order by id asc")  //ORDER 조건은 필수!  
	                .build();
	    }
	 
	 @Bean
	 public ItemProcessor<User, Long> jpaPagingItemProcessor() {
		    return user -> {
		    	return user.getId();
		    };
		}
	 
	 @Bean
	    public ItemWriter<Long> jpaPagingItemWriter() {
	        return list -> {
	            for (Long user : list) {
	                log.info("Current Pay = {}", user);
	            }
	        };
	    }
}
