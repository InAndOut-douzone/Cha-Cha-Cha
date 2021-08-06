package com.douzone.inandout.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.inandout.model.User;

@Repository
public class UserRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public User findByNo(int no) {
		System.out.println("no:" + no);
		return sqlSession.selectOne("user.findByNo", no);	
	}

}
