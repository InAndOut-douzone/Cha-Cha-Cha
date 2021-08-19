package com.cos.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	public User findByUsername(String username);
}
