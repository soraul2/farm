package com.wootae.farm.domain.MulchingFilmCalculator.service;

import com.wootae.farm.domain.MulchingFilmCalculator.dto.MulchingFilmDTO;
import org.springframework.stereotype.Service;

@Service
public class MulchingFilmCalculatorService {

    public MulchingFilmDTO.Response mulchingFilmCalculator(MulchingFilmDTO.Request request){

        final double PYEONG_TO_M2 = 3.3;
        final double M2_TO_PYEONG = 3.3;
        final double CM_TO_M = 100.0;

        //1. 입력 값 확인
        int area = request.getArea(); //int 평 (m)
        int price = request.getPrice(); //int 비닐 한개 가격 (EA)
        int height = request.getHeight(); //int 비닐 길이 (m)
        int width = request.getWidth(); //int 비닐 폭 (cm)

        //1.1 계산 하기 편한 값으로 parsing
        //비닐 cm -> m (1m == 100cm)
        double parseWidth = width / CM_TO_M;

        //2. 밭의 면적 구하기
        double totalArea = area * PYEONG_TO_M2;

        //3. 비닐 한 롤이 덮는 면적 구하기 (폭[m] x 길이[m]
        double oneRollMulchingArea = parseWidth * height;
        //평 수도 같이 return;
        double oneRollMulchingAreaPyeong =  oneRollMulchingArea/M2_TO_PYEONG;
        oneRollMulchingAreaPyeong = Math.round(oneRollMulchingAreaPyeong * 10.0) / 10.0;

        //4. 필요한 비닐 개수 구하기
        double neededCount = Math.round((totalArea / oneRollMulchingArea) * 100) / 100.0;

        //5. 총 금액 구하기
        long totalPrice = (long) (neededCount * price);

        String kPrice = toKoreanCurrency((int) totalPrice);


        MulchingFilmDTO.Response response = MulchingFilmDTO.Response.builder()
                .totalPrice(totalPrice)
                .needsCount(neededCount)
                .formattedPrice(kPrice)
                .onePlasticRollCoverArea(oneRollMulchingAreaPyeong)
                .build();

        return response;
    }


    public String toKoreanCurrency(int price){

        if(price == 0){
            return "0 원";
        }

        int eok = price / 100000000;
        int man = (price % 100000000) / 10000;
        int remain = price % 10000;

        StringBuilder sb = new StringBuilder();

        if(eok > 0){
            sb.append(eok).append("억 ");
        }
        if(man > 0){
            sb.append(man).append("만 ");
        }
        if(remain > 0){
            sb.append(String.format("%,d",remain));
        }

        return sb.toString().trim() + "원";    }

}
