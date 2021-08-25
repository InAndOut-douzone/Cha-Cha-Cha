package com.cos.facebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cos.facebook.model.Leaves;

public interface LeavesRepository extends JpaRepository<Leaves, Integer>{
	
	public List<Leaves> findAll();
	
}
