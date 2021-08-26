package com.cos.facebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.Leaves;

public interface LeavesRepository extends JpaRepository<Leaves, Integer>{
	
	@Query(value = "select * from Leaves where state='success'",nativeQuery = true)
	public List<Leaves> findAll();

	@Query(value = "select * from Leaves where category=:category",nativeQuery = true)
	public List<Leaves> findByNo(String category);

	@Query(value = "select * from Leaves where state='success' and (category=:category or category='오전 반차' or category='오후 반차')",nativeQuery = true)
	public List<Leaves> findByNo2(String category);
	
	@Query(value = "select * from Leaves where state='success' and userId=:id",nativeQuery = true)
	public List<Leaves> findByNo3(long id);
	
	@Query(value = "select * from Leaves where category=:category or category='외근'",nativeQuery = true)
	public List<Leaves> findByNo31(String category);
	
	@Query(value = "select * from Leaves where state='success' and (category=:category or category='외근' or category='연차')",nativeQuery = true)
	public List<Leaves> findByNo32(String category);
	
	@Query(value = "select * from Leaves where state='success' and (category=:category or category='연차')",nativeQuery = true)
	public List<Leaves> findByNo33(String category);
	
	@Query(value = "select * from Leaves where state='success' and (category='외근' or category='연차')",nativeQuery = true)
	public List<Leaves> findByNo34();
	
	public List<Leaves> deleteById(int id);
}
