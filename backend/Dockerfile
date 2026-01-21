# 1. 자바 21 환경 설정 (라즈베리파이 5 호환)
FROM eclipse-temurin:21-jdk

WORKDIR /app

# 2. 소스 코드 복사
COPY . .

# 3. Gradle 실행 권한 부여 및 빌드 (테스트 제외로 속도 향상)
RUN chmod +x ./gradlew
RUN ./gradlew clean build -x test

# 4. [핵심] plain이 붙지 않은 실행 가능한 JAR만 app.jar로 복사
# 이 패턴은 'plain'으로 끝나지 않는 .jar 파일을 찾아줍니다.
RUN cp build/libs/*[!plain].jar app.jar

EXPOSE 8080

# 5. 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]