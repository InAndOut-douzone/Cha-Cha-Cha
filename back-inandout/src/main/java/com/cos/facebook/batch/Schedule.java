package com.cos.facebook.batch;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Schedule {

    // 5초마다 실행
    @Scheduled(cron="00 * * * * *")
    public void executeJob () {
        System.out.println(LocalDateTime.now());
    }

}