package com.cos.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer>{
	
	@Query(value = "select * from Notice where Notice.no=:no",nativeQuery = true)
	Notice findByNo(long no);
}
