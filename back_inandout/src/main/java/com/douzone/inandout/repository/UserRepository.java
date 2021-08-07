package com.douzone.inandout.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.inandout.vo.UserVo;

@Repository
public class UserRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public UserVo findByNo(int no) {
		System.out.println("no:" + no);
		return sqlSession.selectOne("user.findByNo", no);	
	}
	
	public List<UserVo> findAll(){
		return sqlSession.selectList("user.findAll");
	}
}
