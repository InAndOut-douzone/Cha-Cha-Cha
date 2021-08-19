package com.cos.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cos.facebook.model.Hospital;

public interface HospitalRepository extends JpaRepository<Hospital, Integer>{
	// select * from hospital where id = :a
	public Hospital findById(int a);
	
//	@Query(value = "select * from hospital where id = :a", nativeQuery = true )
//	public Hospital findasdf(int a);
}
