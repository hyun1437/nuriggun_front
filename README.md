
# 📖A6조 최종프로젝트 : 누리꾼 (sns형 인터넷 신문사)

## 프로젝트 소개

![Logo](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbqblle%2Fbtsmj7RPlSn%2FrUaZ0Zz9or7ylezzv8OSrK%2Fimg.png)

우연히 뉴스를 보다가 “누리꾼의 반응이 뜨겁습니다” 같은 기자의 말에서 영감을 받아 누리꾼들의 진짜 반응이 어떤지, 기자들은 어디서 정보를 얻는 지 궁금했습니다.

유저가 기사를 내 다른 사람들의 진짜 반응을 확인 할 수 있고 공유할 수 있는 서비스를 생각하며 “ 유저가 기자가 되어 기사를 쓸 수 있는 sns 형 인터넷 신문사” 라는 주제로 프로젝트를 시작하게 되었습니다.

## 프론트엔드 Repository
https://github.com/imjanny/imjanny.github.io

## 백엔드 Repository
https://github.com/imjanny/nuriggun

## 개발 일정

    - 23.6.5 ~ 23.6.26 사이트 오픈 및 중간 발표
    - 23.6.27 ~ 23.7.9 사용자 피드백 받고 개선 & 추가

## 개발 스택

- 백엔드

    `Python 3.8.10`

    `Django 4.2.2`

    `djangorestframework 3.14.0`

    `openai 0.27.8`

    `MySQL 8.0.33`

    `Django allauth 0.54.0`

    `APScheduler 3.10.1`

- 프론트엔드

    `HTML 5`

    `CSS`

    `JavaScript`

## 팀원 소개 및 역할

### 임재훈 [깃허브](https://github.com/imjanny)
팀장 / 

유저 모델, 소셜로그인, 카테고리, 서버 배포 및 관리

### 김경진 [깃허브](https://github.com/JINNY-US)
부팀장 /

쪽지 기능(제보하기, 답장하기, 보낸 쪽지함, 받은 쪽지함), AI 3줄 요약기능, 비동기통신
 
### 배현아 [깃허브](https://github.com/hyun1437)
팀원 /

유저 구독 기능, 게시글/댓글 CRUD, 프로필, 게시글 상세페이지, js & css & html

### 이정현 [깃허브](https://github.com/Leejunghyun7735)
팀원 /

게시글 CRUD, 좋아요 5종반응, 검색, 카테고리, 신고, js & css & html

### 박영주 [깃허브](https://github.com/Bookwhale00)
팀원 /

유저
회원가입(이메일 인증), 일반로그인, 회원탈퇴, 비밀번호 재설정, 메인페이지, 날씨

## ERD
https://www.erdcloud.com/d/3tcCZcvpMsZR3kF99

![App Screenshot](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbExvU6%2FbtsmyYNoyvg%2FfeBE0D2Vcz8w5NMeMWNMu0%2Fimg.png)

## 아키텍쳐 설계

![App Screenshot](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbBNxGW%2FbtsmwfCbCoa%2FN22SaJUPO9ne8lxtKhMFEK%2Fimg.png)


## 구현 기능
#### 회원가입

    - 개인정보동의 체크한 뒤 이메일로 회원가입 (is_active=False)

    - 가입 시 입력한 이메일로 인증이메일 전송

    - 이메일 통해 인증 링크 접속하면 is_active=True
    
#### 일반로그인

    - JWT Token 발급해서 로컬스토리지에 저장
    
    - 로그아웃 시 로컬스토리지 내 Token정보 삭제

#### 소셜로그인

    - all auth 카카오 로그인

#### 회원탈퇴
    
    - is_active = False

#### 비밀번호 찾기

    - 회원가입과 마찬가지로 인증이메일 통해서 링크 받은 뒤 비밀번호 재설정

#### 비밀번호 변경

    - 프로필페이지를 통해서 정규식을 통과한 비밀번호로 변경 가능

#### 프로필

    - url 파라미터에서 user_id별로 유저 프로필페이지로 이동 가능

    - 유저 정보 로드 및 변경(닉네임, 프로필이미지, 관심분야)

    - 유저가 쓴 게시글 모아보기

    - 유저가 스크랩한 게시글 모아보기

#### 팔로우 (구독)

    - 프로필페이지, 메인페이지에서 기자 구독 가능

    - 프로필페이지를 통해서 구독중인 기자리스트 확인 가능

#### 제보하기 (쪽지)
#### 게시글 CRUD
#### 스크랩 (북마크)
#### 공유하기(프론트)
#### 게시글 반응하기 (좋아요, 후속기사 원해요 등등)
#### 검색

    - drf search filter 활용 검색기능 구현 
    
#### 카테고라이징

    - 각 카테고리별로 url파라미터에 값으로 게시글 카테고리필터링

    - 모아보기는 유저가 구독한 기자의 게시글을 모아서 보여줌
    
#### 댓글 CRUD
#### 댓글 좋아요, 싫어요
#### AI를 이용한 기사 3줄 요약 기능
#### 사이트 운영자에게 1:1채팅으로 문의하기(tawk.to)

    - tawk.to 서비스 활용 1:1 문의기능 활용
    
#### 구독중인 기자가 새 글을 작성 시 이메일 알림 기능
#### 신고기능 (가짜뉴스 OUT)
#### 오늘의 날씨

    - 기상청에서 제공하는 공공데이터(초단기실황)를 이용

    - APScheduler를 이용한 cron주기설정

    - 주기적으로 API요청해서 응답받은 날씨정보를 DB에 저장해서 활용

#### 메인페이지

    - 이런 기사는 어때요 : 댓글이 많은 순으로 보여주는 메인슬라이드

    - 방금 올라온 뉴스를 확인해보세요 : 최신 순으로 보여주는 서브 기사

    - 오늘의 HOT뉴스 : 오늘 생성된 기사 중 반응이 가장 많은 기사

    - 기자를 구독해보세요 : active유저 중에서 랜덤 12명

#### 피드페이지

#### 서버 배포
    - AmazonEC2, gunicorn, nginx, docker를 이용해서 백엔드 서버 배포

    - github.io를 이용해서 프론트엔드 배포

## 코드 컨벤션
**💡 백엔드**

**Pascal Case**
RealName, MyVisitorCount - 클래스

**Snake Case**
real_name - 변수, 함수

**Kebab Case**
my-visitor-count - URL

**💡 프론트** 

**Camel Case** realName - 함수

**Kebab Case** my-visitor-count - id, class


