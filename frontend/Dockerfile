# 1. Vite 7 실행을 위해 Node 22 버전을 사용합니다.
FROM node:22-alpine as build
WORKDIR /app

# 2. 의존성 파일 복사
COPY package*.json ./

# 3. 버전 충돌을 무시하고 설치하도록 옵션을 추가했습니다. (핵심 ⭐)
RUN npm install --legacy-peer-deps

# 4. 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 5. 실행 환경 (Nginx) 설정
FROM nginx:alpine
# Vite 빌드 결과물인 dist 폴더를 복사합니다.
COPY --from=build /app/dist /usr/share/nginx/html
# 설정해두신 nginx.conf를 적용합니다.
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]