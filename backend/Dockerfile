# 1. 자바 21 버전으로 변경 (중요!)
FROM openjdk:21-jdk-slim

WORKDIR /app

# 소스 코드 복사
COPY . .

# Gradle 실행 권한 부여 및 빌드 (테스트 건너뛰기)
RUN chmod +x ./gradlew
RUN ./gradlew clean build -x test

# 빌드된 JAR 파일 실행
ARG JAR_FILE=build/libs/*.jar
RUN cp ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]