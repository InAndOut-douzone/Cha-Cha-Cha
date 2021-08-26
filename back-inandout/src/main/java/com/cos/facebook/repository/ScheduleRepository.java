package com.cos.facebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.Leaves;

public class ScheduleRepository {
	@Query(value = "select * from Schedule",nativeQuery = true)
	public List<Leaves> findByNo();
}
