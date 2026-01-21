package com.wootae.farm.global.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    OpenAPI openAPI(){
        return new OpenAPI().info(new Info()
                .title("farm API 명세서")
                .description("농사에 필요한 도구들을 모아둔 API")
                .version("0.0.2")
        );
    }

}
