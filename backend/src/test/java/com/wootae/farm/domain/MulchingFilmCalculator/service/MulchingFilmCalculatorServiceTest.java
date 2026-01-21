package com.wootae.farm.domain.MulchingFilmCalculator.service;

import com.wootae.farm.domain.MulchingFilmCalculator.dto.MulchingFilmDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class MulchingFilmCalculatorServiceTest {

    //테스트 대상 서비스
    MulchingFilmCalculatorService mulchingFilmCalculatorService = new MulchingFilmCalculatorService();

    @Test
    @DisplayName("정상적인 입력값 일 때 비닐 소요량과 금액이 정확하게 계산 되어야 한다.")
    void calculator_success() {
        //given 준비 [ 100평 밭 , 90cm 폭 , 500m 길이 , 25,000원 비닐 가격]
        MulchingFilmDTO.Request request = MulchingFilmDTO.Request.builder()
                .area(100)
                .width(90)
                .height(500)
                .price(25000)
                .build();
        //when 실행
        MulchingFilmDTO.Response response = mulchingFilmCalculatorService.mulchingFilmCalculator(request);

        //then 검증
        assertThat(response.getNeedsCount()).isEqualTo(0.73);
        assertThat(response.getTotalPrice()).isEqualTo(18250);
        assertThat(response.getFormattedPrice()).isEqualTo("1만 8,250원");
        assertThat(response.getOnePlasticRollCoverArea()).isEqualTo(136.4);

    }

}
