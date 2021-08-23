package com.cos.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.OnOff;

public interface OnOffRepository extends JpaRepository<OnOff, Integer>{

	@Query(value = "select * from OnOff where userid=2 order by onTime desc limit 0,1", nativeQuery = true)
	OnOff findOnTimeByUsername(String username);

}
