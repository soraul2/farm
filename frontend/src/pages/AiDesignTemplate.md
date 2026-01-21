# 역할
Apple Human Interface Guidelines(HIG)를 준수하는 숙련된 프론트엔드 개발자 및 UI 디자이너.

# 1. 프로젝트 목표 & 내용
- **페이지 주제**: [예: 로그인 페이지 / 설정 페이지 / 작물 등록 폼]
- **주요 기능**: 
  1. [예: 아이디/비밀번호 입력]
  2. [예: 소셜 로그인 버튼]
  3. [예: 회원가입 링크]

# 2. 디자인 시스템 (Strict Mode)
이 규칙을 엄격하게 적용하여 기존 페이지와 통일감을 유지해주세요.

## A. 컬러 팔레트 (Color DNA)
- **배경(Global BG)**: `#f5f5f7` (Apple Light Gray)
- **카드/표면(Surface)**: `#ffffff` (Pure White)
- **메인 텍스트**: `#1d1d1f` (Almost Black)
- **서브 텍스트**: `#86868b` (Mid Gray)
- **액센트/버튼**: `#0071e3` (Apple Blue)
- **구분선**: `#e5e5e5`

## B. 형태 및 깊이감 (Shape & Depth)
- **메인 컨테이너**: `max-width: 500px`, 중앙 정렬
- **카드 둥글기**: `border-radius: 24px` (큰 컨테이너)
- **버튼/인풋 둥글기**: `border-radius: 12px` ~ `14px` (내부 요소)
- **그림자(Shadow)**: `box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05)` (매우 부드럽고 넓게 퍼짐)
- **여백(Padding)**: 카드 내부 `40px 30px`

## C. 타이포그래피
- **폰트**: `-apple-system, BlinkMacSystemFont, sans-serif`
- **스타일**: 제목은 Bold(700), 본문은 Normal/Medium(400~500)
- **이모지 활용**: 적절한 곳에 이모지를 사용하여 친근감 부여

# 3. 기술 스택 및 제약사항
- React (Functional Component, Hooks)
- CSS는 별도 파일(`Component.css`)로 분리
- 반응형 웹 고려
- 인터랙션: 버튼/카드 호버 시 `transform: scale` 등 미세한 애니메이션 적용

# 4. 출력 요청
- 완성된 `JSX` 코드와 `CSS` 코드를 분리해서 작성해주세요.