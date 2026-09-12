# 💻 LET'S IT

> **개발자를 위한 프로젝트 구인·구직 커뮤니티 플랫폼**

숙명여자대학교 중앙개발동아리 **SOLUX**에서 진행한 팀 프로젝트로,
개발 프로젝트를 함께할 팀원을 모집하고 프로젝트에 참여할 수 있는 **구인·구직 커뮤니티 서비스**입니다.

## 📌 프로젝트 소개

개발 프로젝트를 진행하고 싶은 사용자가 프로젝트를 등록하고,
원하는 프로젝트를 탐색하여 팀원으로 지원할 수 있도록 구성한 웹 서비스입니다.

* **개발 기간**: 2024.04 ~ 2024.08
* **소속**: 숙명여자대학교 중앙개발동아리 SOLUX
* **프로젝트 유형**: 팀 프로젝트
* **개발 분야**: Frontend

## ✨ 주요 기능

### 👤 회원 및 로그인

* 회원 로그인 및 로그아웃
* 로그인 상태 유지
* 사용자 상태에 따른 서비스 접근 관리

### 🔍 프로젝트 탐색

* 프로젝트 목록 조회
* 프로젝트 상세 정보 확인
* 원하는 프로젝트 탐색 및 참여

### 📢 프로젝트 모집

* 프로젝트 등록
* 프로젝트 참여를 위한 팀원 모집
* 프로젝트별 모집 정보 관리

### 📅 프로젝트 일정 관리

* 프로젝트 일정을 캘린더 형태로 확인
* 일정 등록 및 관리

### 💬 커뮤니티

* 프로젝트 및 개발 관련 정보 공유
* 사용자 간 프로젝트 참여 및 소통

## 🛠️ 기술 스택

### Frontend

| 기술           | 사용 목적            |
| ------------ | ---------------- |
| React        | 웹 UI 구현          |
| Vite         | 프로젝트 빌드 및 개발 환경  |
| React Router | 페이지 라우팅          |
| Jotai        | 전역 상태 관리         |
| Axios        | API 통신           |
| FullCalendar | 프로젝트 일정 및 캘린더 UI |
| js-cookie    | 쿠키 관리            |

### Development

| 기술           | 사용 목적       |
| ------------ | ----------- |
| JavaScript   | 주요 개발 언어    |
| ESLint       | 코드 품질 관리    |
| Prettier     | 코드 포맷팅      |
| MSW          | API Mocking |
| Git / GitHub | 버전 관리 및 협업  |

## 🏗️ 프로젝트 구조

```text
src/
├── components/      # 공통 UI 컴포넌트
├── screen/          # 페이지 및 화면
├── store/            # 전역 상태 관리
├── assets/           # 이미지 및 정적 리소스
├── App.jsx           # 애플리케이션 진입점
└── main.jsx          # React 애플리케이션 초기화
```

## 🔑 주요 구현

### 전역 로그인 상태 관리

Jotai를 활용하여 로그인 상태를 전역에서 관리하고,
localStorage에 저장된 로그인 상태를 애플리케이션 실행 시 복원하도록 구현했습니다.

```javascript
const [isLogin, setIsLogin] = useAtom(isLoginAtom);

useEffect(() => {
  const storedLoginStatus = localStorage.getItem("isLoggedIn");

  if (storedLoginStatus === "true") {
    setIsLogin(true);
  } else {
    setIsLogin(false);
  }
}, [setIsLogin]);
```

이를 통해 여러 페이지에서 로그인 상태를 공유하고,
새로고침 이후에도 로그인 상태를 유지할 수 있도록 구성했습니다.

## 📚 프로젝트를 통해 배운 점

* React 기반 컴포넌트 설계 및 웹 페이지 구현
* React Router를 활용한 SPA 라우팅
* Jotai를 활용한 전역 상태 관리
* Axios를 활용한 REST API 통신
* FullCalendar를 활용한 일정 관리 UI 구현
* MSW를 활용한 API Mocking
* GitHub를 활용한 팀 단위 협업 및 버전 관리

## 👥 Team

**숙명여자대학교 중앙개발동아리 SOLUX**

2024.04 ~ 2024.08
