package com.cos.facebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.Holiday;

public interface HolidayRepository extends JpaRepository<Holiday, Integer>{

	@Query(value = "select * from Holiday order by holiday asc",nativeQuery = true)
	List<Holiday> findAlOrderBy();

}
