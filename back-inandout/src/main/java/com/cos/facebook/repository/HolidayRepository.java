package com.cos.facebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.Holiday;

public interface HolidayRepository extends JpaRepository<Holiday, Integer>{
	
	@Query(value = "select * from Holiday where holiday like CONCAT(:dated,'%') order by holiday desc limit 0,1", nativeQuery = true)
	Holiday findByDate(String dated);

	@Query(value = "select * from Holiday where holiday > now() and holiday < DATE_ADD(NOW(), INTERVAL 30 DAY) order by holiday asc",nativeQuery = true)
	List<Holiday> findAlOrderBy();

}
