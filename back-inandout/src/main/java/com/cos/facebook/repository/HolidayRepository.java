package com.cos.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.Holiday;

public interface HolidayRepository extends JpaRepository<Holiday, Integer>{
	
	@Query(value = "select * from Holiday where holiday like CONCAT(:dated,'%') order by holiday desc limit 0,1", nativeQuery = true)
	Holiday findByDate(String dated);

}
