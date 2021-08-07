package com.douzone.inandout.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry
			.addMapping("/**") 							// 어떤 요청을 허락 해줄것이냐, 모든 경로 /**
			.allowedOrigins("http://localhost:3000") 	// 특정경로 3000만 허락
			.allowedMethods(							// 어떤 메서드를 허락할 것이냐
					HttpMethod.GET.name(),
					HttpMethod.POST.name(),
					HttpMethod.PUT.name(),
					HttpMethod.DELETE.name()
			); 
	}	
}

//@Configuration
//public class WebConfig implements WebMvcConfigurer {	
//  @Override
//  public void addCorsMappings(CorsRegistry registry) {
//  	registry.addMapping("/**")
//              .allowedOrigins("http://localhost:3000", "http://35.222.169.XX:9000");
//
//  }
//}