package com.cos.facebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cos.facebook.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	public User findByUsername(String username);

	public List<User> findByRoles(String roles);
	
//	@Query(value = "select asdfsadf", nativeQuery = true)
//	public User findzxcv(String name);

}
