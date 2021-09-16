package com.cos.facebook.repository;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.cos.facebook.model.OnOff;

public interface OnOffRepository extends JpaRepository<OnOff, Integer>{

	@Query(value = "select * from OnOff where userid=:id order by onTime desc limit 0,1", nativeQuery = true)
	OnOff findOnTimeById(long id);

	@Query(value = "select * from OnOff where userId=:id and date like CONCAT(:dated,'%') order by date desc limit 0,1", nativeQuery = true)
	OnOff findByIdAndDate(long id, String dated);
	
	@Query(value = "select * from OnOff where userId=:id and date like CONCAT(:dated,'%') order by date desc", nativeQuery = true)
	List<OnOff> findByIdAndDateList(long id, String dated);
	
	@Query(value = "select no, date, onTime, offTime," // id값으로 일한 날 전체 데이터 불러오기
			+ "date_format(date,'%y년 %m월 %d일') as 'strDate', date_format(onTime,'%H시 %i분 %s초') as 'strOn',"
			+ "date_format(offTime,'%H시 %i분 %s초') as 'strOff', state, userId"
			+ " from OnOff where userId=:id order by date", nativeQuery = true)
	List<OnOff> findAllById(long id);
	
	@Query(value = "select no, date, onTime, offTime," // 기간날짜동안 일한 날 데이터 불러오기
			+ "date_format(date,'%y년 %m월 %d일') as 'strDate', date_format(onTime,'%H시 %i분 %s초') as 'strOn',"
			+ "date_format(offTime,'%H시 %i분 %s초') as 'strOff', state, userId"
			+ " from OnOff where userId=:id and date between :start and :end order by date", nativeQuery = true)
	List<OnOff> findAllByDate(long id, Date start, Date end);
	
	@Query(value = "select " //현재시간 기준으로 월요일, 일요일 날짜구하기
			+ "	ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 0 ) AS MONDAY, "
			+ "	ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 6 ) AS SUNDAY "
			+ "from DUAL",nativeQuery = true)
	List<Date> findWeek();
	
	@Query(value = " select sec_to_time(sum(time_to_sec(timediff(offTime,onTime)))) " // 이번주 일했던 시간 구하기
			+ " from OnOff where userId=:id and date between :start and :end",nativeQuery = true)
	Date workTime(long id, Date start, Date end);

//	
//	@Query(value = "select * from OnOff where date like CONCAT('2021-08-26%') order by offTime asc", nativeQuery = true)
	@Query(value = "select * from OnOff where date like CONCAT(:dated,'%') order by offTime asc", nativeQuery = true)
	List<OnOff> findAllByDate(String dated);
	
	@Query(value="select count(*) from OnOff where userId =:id and date like CONCAT(:dated,'%')", nativeQuery = true)
	Double workYear(long id, String dated); // 1년간의 일해야하는 날 데이터 갯수 구하기
	
	@Query(value="select count(*) from OnOff where (state='지각' or state='조퇴' or state='결근' or "
			+ "state='오전반차&&조퇴' or state= '오후반차&&지각')and userId =:id and date like CONCAT(:dated,'%')", nativeQuery = true)
	Double offYear(long id, String dated); // 1년간의 결근 데이터 갯수 구하기

	@Modifying
	@Transactional
	@Query(value="delete from OnOff where leaveId = :id")
	void deleteByLeaveId(int id);
}