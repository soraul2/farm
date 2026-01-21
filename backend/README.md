# 🚜 Farm Project

> **소개** > 실제 농업 현장에서 바로 사용할 수 있는 실용적인 프로그램을 모아 사용자에게 제공하는 웹 사이트입니다.

<br>

## 🛠️ 프로젝트 구성 (Configuration)

### 1. 기술 스택 (Tech Stack)
* **Backend**
    * **Language:** Java 21
    * **Framework:** Spring Boot 4.0.1
    * **Database:** MySQL
    * **Build Tool:** Gradle
    * **API Specs:** Swagger
    * **Test:** JUnit 5

* **Frontend**
    * **Language:** HTML5, CSS3, JavaScript
    * **Template Engine:** Thymeleaf
    * **Design & Tools:** Bootstrap 5, Gemini

### 2. 인프라 (Infrastructure)
* **Server:** Raspberry Pi 5 (RAM 4GB, Storage 128GB)
* **OS:** Linux
* **Network:** Cloudflare Tunnel
* **Domain:** Gavia

<br>

## 🚀 사용법 (Usage)

### 🏠 메인 사이트
* **URL:** [https://farm.wootae.com](https://farm.wootae.com)
* **API 명세서:** [https://farm.wootae.com/swagger-ui/index.html](https://farm.wootae.com/swagger-ui/index.html)

### 🧮 기능별 페이지
* **멀칭 비닐 계산기**
    * **URL:** [https://farm.wootae.com/mulchingFilmCalculator](https://farm.wootae.com/mulchingFilmCalculator)

<br>

## 🔄 버전 및 업데이트 정보 (Changelog)


### v.farm-0.0.8-SNAPSHOT (2026-01-16) (Current)
* ** REST API 형태로 아예 프론트와 백엔드를 분리하는 작업을 완료하였음.DATA**
* ** SWAGGER 을 통한 API 명세서 다시 작성 완료**
* ** 10억이 넘어가면 원이 표시가 안되는 부분 에러 발생하여 추후 수정 처리 필요**


### v.farm-0.0.7-SNAPSHOT (2026-01-09) (Current)
* **🔍 검색 활성화를 위한 결과 DATA**
* * ** "멀칭 비닐 계산기" 입력 시 정상적으로 구글 화면에 노출되는 것을 확인하였음.
* * ** 네이버는 아직 나오진 않으나 추가적인 절차를 하면 나올 것으로 예상 됨 [예정 완료일 : 26-01-13]

<p align="center">
  <img src="images/v-0.0.6-Search.png" width="500" alt="메인 화면">
</p>    


### 2026 - 01 - 12 (ERROR 발생 사항)
* ** 라즈베리파이 서버의 CPU의 온도가 가열이 되어 서버가 종료가 되는 현상이 발생 또한 서버가 종료 된 이후 서버가 부팅이 되지 않는 상황이 발생함.
* ** [가열문제] -> 서버의 GUI 환경을 CLI 환경으로 변경 및 FC 보조 프로그램은 분리함 , FARM 하나의 서버만 돌아가도록 만들었음
* ** [부팅문제] -> 정상적인 라즈베리파이와 크로스체킹 한 결과 hat 과 라즈베리파이에 체결된 플랫케이블이 문제가 생긴것을 확인하여 교체하였음.

### v.farm-0.0.6-SNAPSHOT (2026-01-09)
* **🔍 SEO 및 AI 검색 최적화 (Search Engine Optimization)**
  * **메타 태그 고도화:** 검색 엔진(Google, Naver) 및 LLM(ChatGPT, Gemini)이 페이지의 목적을 정확히 이해하도록 `<meta name="description">`, `og:title` 등 핵심 태그 적용.
  * **JSON-LD 구조화 데이터 적용:** `SoftwareApplication` 스키마를 적용하여 기계가 웹 애플리케이션(계산기)으로 인식하도록 표준 데이터 제공.
  * **Robots.txt 정책 개방:** `User-agent: *`, `Allow: /` 설정을 통해 모든 검색 봇 및 AI 크롤러의 접근 허용.
  * **크롤러 접근성 개선:** Cloudflare WAF 설정을 최적화하여 Naver Yeti 등 주요 검색 봇의 접근 차단 문제 해결.

* **🎨 UI/UX 및 콘텐츠 개선**
  * **Semantic Header 구조 적용:** 디자인(Apple Style)을 해치지 않으면서 AI가 학습하기 좋은 형태의 설명 문구(`<header>`, `<h1>`) 추가.
  * **가독성 강화:** "한국 농가 기준", "평 단위 입력" 등 타겟 유저에게 명확한 문맥(Context) 제공.

* **🛠️ 인프라 안정화**
  * Cloudflare Tunnel 연결 안정성 확보 및 500 Error 트러블슈팅 완료.

### v.farm-0.0.5-SNAPSHOT 
* **naver 노출 : ** Google Search Console에서는 성공적으로 테스트 됐고 naver search Advisor 에서는 robots.txt 부분이 허용이 되지 않는 다고 하여 정보를 찾아본 결과
* 클라우드 플레어에서 자동으로 robots 를 막는 robots.txt 에 텍스트를 추가한 것을 확인 결론 :  Sitemap: https://farm.wootae.com/sitemap.xml 추가
* 로고 이미지가 너무 AI가 만든 것으로 보이기에 새로운 이미지로 수정.

### v.farm-0.0.4-SNAPSHOT
* **naver,google 노출 :** google Search Console , naver search Advisor 활용하여 filmCalculator 헤더에 코드 추가 및 robots.txt로 검색 로봇 노출 허용
* ** SSR 방식은 정적 html 파일이기 때문에 검색 엔진에 더욱 뜰 확률이 높아진다고 함. **

### v.farm-0.0.3-SNAPSHOT
* **API 명세 구현:** Swagger 적용
* **테스트 코드 구현:** JUnit 5를 활용한 데이터 테스트 검증 완료

### v.farm-0.0.2-SNAPSHOT
* **사용자 피드백 반영 (Issue Resolved)**
    * 비닐 1롤당 면적 단위를 제곱미터($m^2$)에서 **'평'**으로 변경 요청 반영.
    * '1롤 커버'라는 모호한 용어를 **'한 롤당 멀칭 가능한 면적'**으로 수정하고 UI 정렬 개선.
* **사용자 편의성 개선 (UI/UX)**
    * 주 사용층(30~40대 이상)을 고려하여 인터페이스 가독성 증대.
    * 금액 표기 개선: 기존 숫자 나열(100000000) → **한글 단위 표기(1억 원)** 적용.
    * 단위 병행 표기: 1롤당 면적을 제곱미터와 평으로 함께 출력.
* **기능 추가 및 개선**
    * **히스토리 기능:** 이전 계산 데이터를 확인할 수 있도록 '최근 계산 조회' 기능 추가.
    * **대용량 처리:** 21억 이상의 큰 금액 처리를 위해 데이터 타입을 `long`으로 확장.

<p align="center">
  <img src="images/v-0-0-2-main.png" width="500" alt="메인 화면">
</p>    

<p align="center">
  <img src="images/v-0-0-2-list.png" width="500" alt="리스트 화면">
</p>    

### v.farm-0.0.1-SNAPSHOT
* **최초 릴리즈:** 기본 계산 기능 구현

<br>

## 🐛 버그 및 디버그 (Known Issues)
* **단위 환산 표기 오류:** 멀칭 비닐 규격을 cm → m로 환산할 때, `0.5`와 같이 앞자리가 0인 경우 `.5`로 표기되는 현상 확인. (수정 예정)

<br>

## 👨‍💻 프로그래머 정보 (Developer)
* **GitHub:** [https://github.com/soraul2](https://github.com/soraul2)

<br>

## 📜 저작권 및 사용권 정보 (License)
* **사용권:** ALL
* **저작권:** Copyright ⓒ 2026 Kim Wootae. All rights reserved.

<br>

## ❓ FAQ
