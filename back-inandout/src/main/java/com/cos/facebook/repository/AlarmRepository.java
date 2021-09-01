package com.cos.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cos.facebook.model.Alarm;

public interface AlarmRepository extends JpaRepository<Alarm, Integer>{

}
