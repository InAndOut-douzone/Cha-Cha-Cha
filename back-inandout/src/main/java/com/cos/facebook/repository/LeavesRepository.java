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
	
	@Query(value = "select * from Leaves where state='success' and userId=:id",nativeQuery = true)
	public List<Leaves> findByNo1(long id);

	@Query(value = "select * from Leaves where state='success' and (category=:category or category='오전 반차' or category='오후 반차')",nativeQuery = true)
	public List<Leaves> findByNo2(String category);
	
	@Query(value = "select * from Leaves where category='출장' or category='외근'",nativeQuery = true)
	public List<Leaves> findByNo34();
	
	@Query(value = "select * from Leaves where state='success' and (category='연차' or category='출장' or category='외근')",nativeQuery = true)
	public List<Leaves> findByNo234();
	
	@Query(value = "select * from Leaves where state='success' and (category='연차' or category='출장')",nativeQuery = true)
	public List<Leaves> findByNo23();
	
	@Query(value = "select * from Leaves where state='success' and (category='연차' or category='외근')",nativeQuery = true)
	public List<Leaves> findByNo24();
	
	
	@Query(value = "select * from Leaves where (state='success' and userId=:id) or (state='success' and category='연차')",nativeQuery = true)
	public List<Leaves> findByNo12(long id);
	@Query(value = "select * from Leaves where (state='success' and userId=:id) or category='출장'",nativeQuery = true)
	public List<Leaves> findByNo13(long id);
	@Query(value = "select * from Leaves where (state='success' and userId=:id) or category='외근'",nativeQuery = true)
	public List<Leaves> findByNo14(long id);
	@Query(value = "select * from Leaves where (state='success' and userId=:id) or category='연차' or category='출장')",nativeQuery = true)
	public List<Leaves> findByNo123(long id);
	@Query(value = "select * from Leaves where (state='success' and userId=:id) or category='연차' or category='외근')",nativeQuery = true)
	public List<Leaves> findByNo124(long id);
	@Query(value = "select * from Leaves where (state='success' and userId=:id) or category='출장' or category='외근')",nativeQuery = true)
	public List<Leaves> findByNo134(long id);
	
	
	
	
	
	@Query(value = "select * from Leaves where fromUserId = :doctorId and state='wait'", nativeQuery = true)
	List<Leaves> findByDoctorId(long doctorId);

	
}
