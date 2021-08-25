package com.cos.facebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.Leaves;

public interface LeavesRepository extends JpaRepository<Leaves, Integer>{
	
	@Query(value = "select * from Leaves where state='success'",nativeQuery = true)
	public List<Leaves> findAll();
	
}
