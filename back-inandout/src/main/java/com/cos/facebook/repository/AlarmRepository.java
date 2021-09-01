package com.cos.facebook.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.Alarm;

public interface AlarmRepository extends JpaRepository<Alarm, Integer>{

	@Query(value = "select * from Alarm where toUser = :id order by regDate desc",nativeQuery = true)
	public List<Alarm> findAllById(long id);

	@Modifying
	@Transactional
	@Query(value = "update Alarm set state = 0 where toUser = :id and state = 1",nativeQuery = true)
	public int updateState(long id);
}
