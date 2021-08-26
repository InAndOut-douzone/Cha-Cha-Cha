package com.cos.facebook.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.OnOff;

public interface OnOffRepository extends JpaRepository<OnOff, Integer>{

	@Query(value = "select * from OnOff where userid=:id order by onTime desc limit 0,1", nativeQuery = true)
	OnOff findOnTimeById(long id);

	@Query(value = "select * from OnOff where userId=:id and date like CONCAT(:dated,'%') order by date desc limit 0,1", nativeQuery = true)
	OnOff findByIdAndDate(long id, String dated);
	
	@Query(value = "select no, date, onTime, offTime,"
			+ "date_format(date,'%y년 %m월 %d일') as 'strDate', date_format(onTime,'%H시 %i분 %s초') as 'strOn',"
			+ "date_format(offTime,'%H시 %i분 %s초') as 'strOff', state, userId"
			+ " from OnOff where userId=:id order by date", nativeQuery = true)
	List<OnOff> findAllById(long id);
	
	@Query(value = "select no, date, onTime, offTime,"
			+ "date_format(date,'%y년 %m월 %d일') as 'strDate', date_format(onTime,'%H시 %i분 %s초') as 'strOn',"
			+ "date_format(offTime,'%H시 %i분 %s초') as 'strOff', state, userId"
			+ " from OnOff where userId=:id and date between :start and :end order by date", nativeQuery = true)
	List<OnOff> findAllByDate(long id, Date start, Date end);
	
	@Query(value = "select "
			+ "	ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 0 ) AS MONDAY, "
			+ "	ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 6 ) AS SUNDAY "
			+ "from DUAL",nativeQuery = true)
	List<Date> findWeek();
	
	@Query(value = " select sec_to_time(sum(time_to_sec(timediff(offTime,onTime)))) "
			+ " from OnOff where userId=:id and date between :start and :end",nativeQuery = true)
	Date workTime(long id, Date start, Date end);
}
