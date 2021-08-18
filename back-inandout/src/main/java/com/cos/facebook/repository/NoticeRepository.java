package com.cos.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cos.facebook.model.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer>{

}
