package com.cos.facebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.OnOff;

public interface OnOffRepository extends JpaRepository<OnOff, Integer>{

	@Query(value = "select * from OnOff where userid=:id order by onTime desc limit 0,1", nativeQuery = true)
	OnOff findOnTimeById(long id);

	@Query(value = "select * from OnOff where userId=:id and date like CONCAT(:dated,'%') order by date desc limit 0,1", nativeQuery = true)
	OnOff findByIdAndDate(long id, String dated);
	
	@Query(value = "select * from OnOff where userId=:id order by date", nativeQuery = true)
	List<OnOff> findAllById(long id);
}
