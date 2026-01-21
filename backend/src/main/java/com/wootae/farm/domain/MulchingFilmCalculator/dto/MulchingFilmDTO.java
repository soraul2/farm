package com.wootae.farm.domain.MulchingFilmCalculator.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class MulchingFilmDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Valid
    @Schema(description = "비닐 계산 요청 데이터")
    public static class Request{

        @Schema(description = "밭의 면적 (평)",example = "100")
        @NotNull(message = "면적을 입력해주세요.")
        @Min(value = 1 , message = "면적은 1평 이상이어야 합니다.")
        private Integer area;

        @Schema(description = "멀칭 비닐 롤의 너비 (cm)" ,example = "150")
        @Min(value = 1 , message = "너비는 1cm 이상이어야 합니다.")
        @NotNull(message = "멀칭 비닐의 너비를 입력해주세요.")
        private Integer width;

        @Schema(description = "멀칭 비닐 롤의 길이 (m)" , example = "20")
        @Min(value = 1 , message = "길이는 1m 이상이어야 합니다.")
        @NotNull(message = "멀칭 비닐의 길이을 입력해주세요.")
        private Integer height;
        @Schema(description = "멀칭 비닐 롤 한개 가격" , example = "25000")
        @Min(value = 1 , message = "가격은 1원 이상이어야 합니다.")
        @NotNull(message = "멀칭 비닐 롤의 한개 가격을 입력해주세요.")
        private Integer price;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "비닐 계산 결과 데이터")
    public static class Response{
        @Schema(description = "필요한 비닐 수량 (롤)")
        private double needsCount;
        @Schema(description = "총 예상 비용 (원)")
        private long totalPrice;
        @Schema(description = "한글 포맷팅 된 비용")
        private String formattedPrice;
        @Schema(description = "비닐 1롤이 덮을 수 있는 평수")
        private double onePlasticRollCoverArea;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Record {
        private Request request;   // 당시 입력값
        private Response response; // 당시 결과값
    }

}
