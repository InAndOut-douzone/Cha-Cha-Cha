package com.cos.facebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.Leaves;
import com.cos.facebook.model.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer>{
	
	@Query(value = "select * from Notice order by no desc",nativeQuery = true)
	public List<Notice> findAll();
	
	@Query(value = "select* from Notice order by no desc limit 0,4",nativeQuery = true)
	public List<Notice> findFour();
	
	@Query (value = "select * from Notice "
				+ "where no in ((select no from Notice where no> :no order by no limit 1),"
				+ "(select no from Notice where no< :no order by no desc limit 1))",nativeQuery = true)
	public List<Notice> findPrev(long no);
	
	@Query(value = "select * from Notice where Notice.no=:no",nativeQuery = true)
	Notice findByNo(long no);
}
