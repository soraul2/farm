package com.wootae.farm.domain.MulchingFilmCalculator.controller;

import com.wootae.farm.domain.MulchingFilmCalculator.dto.MulchingFilmDTO;
import com.wootae.farm.domain.MulchingFilmCalculator.service.MulchingFilmCalculatorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Tag(name = "Mulching Film Calculator", description = "농업용 멀칭 비닐 계산기 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calculator")
public class RestMulchingFilmCalculatorController {

    private final MulchingFilmCalculatorService mulchingFilmCalculatorService;


    @Operation(summary = "멀칭 비닐 수량 및 비용 계산", description = "평수, 폭, 길이, 롤당 가격을 입력받아 필요한 롤의 개수와 총 비용을 계산합니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "계산 성공",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = MulchingFilmDTO.Response.class) // [3] 성공 시 반환 모델 연결
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "유효성 검사 실패 (입력값 오류)",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(example = "{\"area\": \"평수를 입력해주세요.\", \"width\": \"폭은 0보다 커야 합니다.\"}") // [4] 에러 예시 제공
                    )
            )
    })
    @PostMapping("/mulchingCalculator")
    public ResponseEntity<?> mulchingCalculator(@Valid @RequestBody MulchingFilmDTO.Request request, BindingResult bindingResult) {

        // 1. 유효성 검사 실패 시 (400 Bad Request + 에러 메시지 맵 반환)
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error : bindingResult.getFieldErrors()) {
                // key: 필드명(area, width...), value: 에러메시지
                errorMap.put(error.getField(), error.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        }

        MulchingFilmDTO.Response response = mulchingFilmCalculatorService.mulchingFilmCalculator(request);

        return ResponseEntity.ok(response);
    }

}
