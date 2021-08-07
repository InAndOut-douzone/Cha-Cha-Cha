## Cha Cha Cha Project

### 의원 근태 관리

### ✔ 다운

```bash
$ git clone https://github.com/InAndOut-douzone/Cha-Cha-Cha.git
$ cd front_inandout
$ npm i
```

# 🌈🌈🌈🌈🌈🌈🌈

## 팀명

인앤아웃

## 팀원

김정현(조장), 이재성, 김정인

## 프로젝트명

반차 연차 월차 (차.차.차)

## 비전

Think different

## 그라운드 룰

1일 2회의

1주 1리뷰

지각 금지

협업 하기

의견 내기

---

## 주제

본 프로젝트의 목표는 의료진들의 근태내역, 병원일정, 휴무일 등을 관리하는 의원 근태관리 시스템을 개발하는 것입니다.

## 개발환경

React, Spring, MySQL, Socket

## 사용 기술

### 1. front ( React )

- axios, fetch
- styled-component
- antd
- react-router-dom
- redux, react-redux

### 2. back ( Spring boot )

- security
- MyBatis
- Spring Boot DevTools

### 3. 배포

- aws ec2
- aws rds

## 기능

- 로그인

  1. 회원 가입 기능은 없고 사용자 추가 시 데이터베이스에서 등록한다
  2. 아이디(직원 번호) 만으로 로그인 할 수 있다,
  3. 사용자는 의사/간호사

- 간호사기능 (연차신청)

  1. "일정 등록" 버튼을 통해 일정을 등록할 수 있다.
  2. 등록한 일정을 클릭하면 일정을 조회, 수정, 삭제할 수 있다. 단, 수정, 삭제는 자신이 등록한 일정만 가능하다.
  3. 등록할 수 있는 일정은 반차 / 연차 / 외근 / 출장등이 있다.
  4. "연차 신청" 버튼을 통해 반차 / 연차를 신청할 수 있다.

- 의사기능

  1. "일정 등록" 버튼을 통해 일정을 등록할 수 있다.
  2. 의사는 같은 의사를 제외한 모든 일정을 수정, 삭제 할 수 있다.
  3. 일정을 편집하는 경우 일정 대상에 등록된 사람들에게 알림이 간다. "[일정명] 일정이 수정/삭제 되었습니다."
  4. 간호사가 신청한 반차/연차를 승인/거절할 수 있다.

- 일정/조회
  1. 일정 조회 형태는 월 캘린더 형태와 목록 형태가 있다.
  2. 대상에 본인이 포함되어 있는 일정을 휴가/외근/출장 별 필터링이 가능하다.
