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


	// Message Converters
//		@Bean
//		public StringHttpMessageConverter stringHttpMessageConverter() {
//			StringHttpMessageConverter messageConverter = new StringHttpMessageConverter();  
//			messageConverter.setSupportedMediaTypes(
//				Arrays.asList(
//					new MediaType("text", "html", Charset.forName("utf-8"))
//				)
//			);
//			return messageConverter;
//		}
//		
//		@Bean
//		public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
//			Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder()
//				.indentOutput(true)
//				.dateFormat(new SimpleDateFormat("yyyy-mm-dd"));
//			
//			MappingJackson2HttpMessageConverter messageConverter
//				= new MappingJackson2HttpMessageConverter(builder.build());
//			messageConverter.setSupportedMediaTypes(
//				Arrays.asList(
//					new MediaType("application", "json", Charset.forName("utf-8"))	
//				)
//			);
//			return messageConverter;
//		}
//
//		@Override
//		public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
//			converters.add(stringHttpMessageConverter());
//			converters.add(mappingJackson2HttpMessageConverter());
//		}

//@Configuration
//public class WebConfig implements WebMvcConfigurer {	
//  @Override
//  public void addCorsMappings(CorsRegistry registry) {
//  	registry.addMapping("/**")
//              .allowedOrigins("http://localhost:3000", "http://35.222.169.XX:9000");
//
//  }
//}