# 농업용 멀칭 비닐 계산기 (Agricultural Mulching Calculator)

## 1. 전체 시스템 구성 (System Overview)
본 프로젝트는 농업 현장에서 필요한 멀칭 비닐의 소요량을 효율적으로 계산하기 위한 웹 서비스입니다. 기존 SSR(Server-Side Rendering) 방식에서 사용자 경험 향상과 유지보수 효율성을 위해 React(Frontend)와 Spring Boot(Backend)가 분리된 구조로 재설계되었습니다.

## 2. 아키텍처 (Architecture)
### 유형
* **Separated Monolithic Architecture**: 프론트엔드와 백엔드가 논리적/물리적으로 분리되어 있으나, 마이크로서비스(MSA)처럼 과도하게 쪼개지 않고 단일 서비스 단위로 배포 및 관리되는 구조입니다.

### 통신 방식
* **RESTful API**: 프론트엔드(React)와 백엔드(Spring Boot) 간의 데이터 통신은 JSON 포맷을 사용하는 REST API 표준을 따릅니다.

### 패턴
* **Layered Architecture**: 관심사의 분리를 위해 Controller, Service, Repository 계층으로 명확히 구분하여 개발되었습니다.

## 3. 기술 스택 및 구성 요소 (Tech Stack)
### Frontend
* **Library**: React
* **HTTP Client**: Axios (비동기 통신 처리)
* **Web Server**: Nginx (정적 파일 서빙 및 리버스 프록시)

### Backend
* **Framework**: Spring Boot
* **WAS**: Tomcat (Spring Boot Embedded)
* **Language**: Java

### Database
* **RDBMS**: MySQL

## 4. 애플리케이션 구조 (Application Structure)
### 계층 구조 (Layered Architecture)
1. **Presentation Layer (Controller)**: 클라이언트의 요청을 받아 유효성을 검증하고 비즈니스 로직으로 전달합니다.
2. **Business Layer (Service)**: 핵심 비즈니스 로직과 트랜잭션을 처리합니다.
3. **Data Access Layer (Repository)**: 데이터베이스에 직접 접근하여 CRUD 작업을 수행합니다.

### 패키지 구조 (Packaging)
* **기능별 패키징 (Package by Feature)**: 유지보수성을 높이기 위해 관련된 기능(도메인) 단위로 패키지를 먼저 나누고, 그 내부에서 계층(Controller, Service, Repository)을 나누는 방식을 채택했습니다.
    * 예: `com.project.calculator` (기능) -> `controller`, `service`, `repository` (계층)

## 5. 주요 의존성 (Dependencies)
### Backend (build.gradle)
* **Spring Web**: 웹 애플리케이션 구축 및 REST API 구현
* **Spring Data JPA**: 데이터베이스 접근 및 ORM 기술 활용
* **MySQL Connector**: MySQL 데이터베이스 드라이버
* **Lombok**: 보일러플레이트 코드(Getter, Setter 등) 제거
* **Validation**: 데이터 유효성 검증

### Frontend (package.json)
* **Axios**: 서버 API 통신
* **React Router**: SPA(Single Page Application) 라우팅 처리

## 6. 데이터 아키텍처 (Data Architecture)
* **ORM (Object-Relational Mapping)**: JPA(Hibernate)를 사용하여 객체 지향적으로 데이터를 관리합니다.
* **Schema**: MySQL을 사용하여 관계형 데이터를 저장하며, 비즈니스 로직에 맞춰 정규화된 테이블 설계를 따릅니다.

## 7. 인프라 및 배포 아키텍처 (Infrastructure & Deployment)
### Server
* **Hardware**: Raspberry Pi 5
* **Network**: Cloudflare Tunnel (포트포워딩 없는 보안 접속 및 도메인 연결)

### CI/CD (Continuous Integration & Deployment)
* **Platform**: GitHub Actions
* **Runner**: Self-hosted Runner (라즈베리파이 내부 구동)
* **Process**: Code Push -> GitHub Actions Trigger -> Raspberry Pi Runner -> Docker Image Build -> Container Restart

### Containerization
* **Docker & Docker Compose**: 프론트엔드(Nginx)와 백엔드(Spring Boot)를 컨테이너화하여, 단일 명령(`docker compose up`)으로 전체 서비스를 일관된 환경에서 실행합니다.