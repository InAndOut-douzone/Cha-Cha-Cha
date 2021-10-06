package com.cos.facebook.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	@Query( value = "select * from User where username = :username and leaveDate is null", nativeQuery = true)
	public User findByUsername(String username);

	@Query( value = "select * from User where roles = :roles and leaveDate is null", nativeQuery = true)
	public List<User> findByRoles(String roles);

	public User findByName(String fromUser);

	@Query( value = "select * from User where leaveDate is not null", nativeQuery = true)
	public List<User> findLeaveUser();

	@Query( value = "select * from User where leaveDate is null", nativeQuery = true)
	public List<User> findAllLive();

	@Query( value = "select * from User where leaveDate is null and position ='간호사'", nativeQuery = true)
	public List<User> findAllNurse();
	
	@Query( value = "select * from User where id=:id",nativeQuery = true)
	public User findById2(Long id);
	
	@Query( value = "select * from User where hireDate <= date_add(now(),INTERVAL -1 YEAR) and leaveDate is null", nativeQuery = true)
	public List<User> findYearUser();
	
	@Query( value = "select * from User where hireDate <= date_add(now(),INTERVAL -1 MONTH) and leaveDate is null", nativeQuery = true)
	public List<User> findMonthUser();
	
//	@Query(value = "select asdfsadf", nativeQuery = true)
//	public User findzxcv(String name);

}