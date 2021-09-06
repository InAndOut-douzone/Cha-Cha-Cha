package com.cos.facebook;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableBatchProcessing
public class InAndOutApplication {

	public static void main(String[] args) {
		SpringApplication.run(InAndOutApplication.class, args); 
	}

}
