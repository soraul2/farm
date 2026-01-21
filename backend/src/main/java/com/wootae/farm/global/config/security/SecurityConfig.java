package com.wootae.farm.global.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .httpBasic((auth) -> auth.disable())
                .csrf((auth) -> auth.disable()) // API 서버이므로 CSRF는 비활성화 유지
                .formLogin((auth) -> auth.disable())
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http
                .cors((cors) -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    // [수정!] 실제 도메인과 로컬 환경 모두 허용하거나, 전체 허용으로 변경
                    config.setAllowedOrigins(List.of(
                            "http://localhost:5173",
                            "https://farm.wootae.com",
                            "http://farm.wootae.com"
                    ));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }));

        http
                .authorizeHttpRequests((auth) -> auth
                        // /api/calculator/** 주소가 정확한지 다시 한번 확인하세요!
                        .requestMatchers("/api/calculator/**", "/mulchingFilmCalculator").permitAll()
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }

}