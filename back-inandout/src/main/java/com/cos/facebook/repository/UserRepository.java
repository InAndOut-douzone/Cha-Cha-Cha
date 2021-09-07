package com.cos.facebook.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	public User findByUsername(String username);

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
	
//	@Query(value = "select asdfsadf", nativeQuery = true)
//	public User findzxcv(String name);

}