//package com.cos.facebook.batch;
//
//import javax.persistence.EntityManagerFactory;
//
//import org.springframework.batch.item.ItemReader;
//import org.springframework.batch.item.NonTransientResourceException;
//import org.springframework.batch.item.ParseException;
//import org.springframework.batch.item.UnexpectedInputException;
//import org.springframework.batch.item.database.JpaPagingItemReader;
//import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//
//import com.cos.facebook.model.User;
//
//public class Reader implements ItemReader<> {
//	
//	@Autowired
//	private EntityManagerFactory entityManagerFactory;
//	
//	private String[] messages = { "javainuse.com",
//			"Welcome to Spring Batch Example",
//			"We use H2 Database for this example" };
//
//	private static final int chunkSize = 10;
//	
//	 @Bean
//	    public JpaPagingItemReader<User> jpaPagingItemReader() {
//	        return new JpaPagingItemReaderBuilder<User>()
//	                .name("jpaPagingItemReader")
//	                .entityManagerFactory(entityManagerFactory) //DataSource가 아닌 EntityManagerFactory를 통한 접근  
//	                .pageSize(chunkSize)
//	                .queryString("SELECT p FROM Pay p WHERE amount >= 2000 ORDER BY id ASC")  //ORDER 조건은 필수!  
//	                .build();
//	    }
//
//}