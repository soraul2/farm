# 1단계: Node.js 환경에서 빌드하기
FROM node:18-alpine as build
WORKDIR /app

# 패키지 정보 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build
# (주의: 만약 Vite가 아니라 CRA라면 아래 경로에서 /dist를 /build로 바꿔야 함)

# 2단계: Nginx 환경에서 실행하기
FROM nginx:alpine
# 빌드된 결과물(dist 폴더)을 Nginx가 보여줄 폴더로 복사
COPY --from=build /app/dist /usr/share/nginx/html
# 우리가 만든 Nginx 설정 파일 복사 (아래 3번에서 만들 파일)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]