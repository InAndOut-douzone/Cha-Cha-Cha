package com.cos.facebook;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableBatchProcessing
public class InAndOutApplication {

	public static void main(String[] args) {
		SpringApplication.run(InAndOutApplication.class, args); 
	}

}
