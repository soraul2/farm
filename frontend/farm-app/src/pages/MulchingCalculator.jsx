import React, { useState } from 'react';
import './MulchingCalculator.css'; // 위에서 만든 CSS 파일 임포트
import { Helmet } from 'react-helmet-async'; // 추가
const MulchingCalculator = () => {
    // 1. 입력값 상태 관리 (th:field 대체)
    const [formData, setFormData] = useState({
        area: '',
        width: '',
        height: '',
        price: ''
    });

    // 2. 결과값 및 히스토리 상태 관리 (th:if="${response != null}" 대체)
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]); // 계산 기록
    const [errors, setErrors] = useState({}); // 유효성 검사 에러


    // 뒤로가기 핸들러
    const handleGoBack = () => {
        // 방법 1: 브라우저 뒤로가기 (히스토리)
        // window.history.back(); 
        
        // 방법 2: 특정 메인 페이지 URL로 이동 (추천)
        window.location.href = '/'; 
    };
    
    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // 타이핑 시 에러 초기화
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    // 3. 폼 제출 및 API 통신 (th:action 대체)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 간단한 클라이언트 유효성 검사 (필요시 백엔드 에러로 대체 가능)
        const newErrors = {};
        if (!formData.area) newErrors.area = "밭의 면적을 입력해주세요.";
        if (!formData.width) newErrors.width = "비닐 폭을 입력해주세요.";
        if (!formData.height) newErrors.height = "비닐 길이를 입력해주세요.";
        if (!formData.price) newErrors.price = "가격을 입력해주세요.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // [TODO] 백엔드 API 호출 (REST API)
            // 실제 구현 시 아래 주소를 백엔드 주소로 변경하세요 (예: http://localhost:8080/api/calculate)
            const response = await fetch('http://localhost:8080/api/calculator/mulchingCalculator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // 백엔드에서 받은 데이터를 상태에 저장
            setResult(data);

            // 히스토리에 추가 (최신순)
            const newHistoryItem = {
                request: { ...formData },
                response: data
            };
            setHistory([newHistoryItem, ...history].slice(0, 5)); // 5개만 유지

        } catch (error) {
            console.error("Calculation failed:", error);
            alert("계산 중 오류가 발생했습니다. 백엔드 연결을 확인해주세요.");
        }
    };

    // 숫자 포맷팅 유틸리티 (th:text="${#numbers...}" 대체)
    const formatNumber = (num) => {
        return num ? new Intl.NumberFormat('ko-KR').format(num) : '0';
    };

    return (
        <div className="calculator-container">
            {/* ▼ [2] 여기에 헬멧 코드를 추가하세요 ▼ */}
            <Helmet>
                {/* 1. 검색 결과 제목 (가장 중요) */}
                <title>농업용 멀칭 비닐 계산기 - 밭 평수로 비닐 수량/비용 자동 계산 | 모두의 농장</title>

                {/* 2. 검색 결과 설명 (Description) */}
                <meta 
                    name="description" 
                    content="밭 평수와 비닐 폭, 길이를 입력하면 필요한 멀칭 비닐 롤 개수와 예상 비용을 즉시 계산해 드립니다. 텃밭 농사, 주말 농장 필수 준비물 계산기." 
                />

                {/* 3. 키워드 (네이버 참고용) */}
                <meta 
                    name="keywords" 
                    content="멀칭비닐계산, 농업용비닐, 밭평수계산, 비닐수량, 농자재가격, 텃밭준비물, 주말농장," 
                />

                {/* 4. 대표 URL (중복 문서 방지) */}
                <link rel="canonical" href="https://farm.wootae.com/mulchingCalculator" />

                {/* 5. SNS/카톡 공유 최적화 (Open Graph) - 네이버가 좋아함 */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="농업용 멀칭 비닐 계산기 | 모두의 농장" />
                <meta property="og:description" content="내 밭에 비닐이 몇 롤 필요할까? 평수만 입력하면 수량과 비용을 바로 알려드립니다." />
                <meta property="og:image" content="https://farm.wootae.com/og-image.jpg" /> {/* 썸네일 이미지가 있다면 경로 입력 */}
                <meta property="og:url" content="https://farm.wootae.com/mulchingCalculator" />
                <meta property="og:site_name" content="우태의 농장" />
            </Helmet>
            <div className="container">
                <div className="calculator-card">

                    {/* ▼ [추가된 부분] 뒤로가기 버튼 ▼ */}
                    <button
                        type="button"
                        className="btn-back"
                        onClick={handleGoBack}
                        aria-label="메인으로 가기"
                    >
                        {/* 뒤로가기 화살표 아이콘 (SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <header className="header-section">
                        <h1 className="card-title">농업용 멀칭 비닐 계산기</h1>
                        <p className="card-description">
                            밭 면적(평)과 비닐 규격을 입력하면 필요한<br />
                            <strong>롤 수량과 비용</strong>을 즉시 계산해 드립니다.
                        </p>
                    </header>

                    {/* Form 시작 */}
                    <form onSubmit={handleSubmit} noValidate>

                        {/* 결과 화면 (조건부 렌더링) */}
                        {result && (
                            <div className="result-container">
                                <p className="result-label">필요 수량</p>
                                <h1 className="result-main-text">
                                    {result.needsCount}<span className="result-unit">롤</span>
                                </h1>
                                <p className="result-sub-text">
                                    예상 금액: {formatNumber(result.totalPrice)}원
                                    <span style={{ fontSize: '0.8em', color: '#86868b', marginLeft: '8px' }}>
                                        ({result.formattedPrice})
                                    </span>
                                </p>

                                <div className="calculation-box">
                                    <p className="calc-title">💡 계산 상세 내역 (1평 = 3.3m²)</p>
                                    <ul className="calc-list">
                                        <li>
                                            <span className="calc-label">1. 밭 전체 면적</span>
                                            <span className="calc-value">
                                                {formData.area}평 × 3.3 =
                                                <strong> {(formData.area * 3.3).toFixed(1)}m²</strong>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="calc-label">2. 한 롤당 멀칭 가능한 면적</span>
                                            <span className="calc-value">
                                                {(formData.width / 100).toFixed(1)}m × {formData.height}m =
                                                <strong> {((formData.width / 100) * formData.height).toFixed(1)}m²</strong>
                                                <span style={{ color: '#0071e3', marginLeft: '4px' }}>
                                                    (약 {result.onePlasticRollCoverArea}평)
                                                </span>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="calc-label">3. 최종 계산</span>
                                            <span className="calc-value">
                                                전체 면적 ÷ 1롤 면적 =
                                                <span style={{ color: '#0071e3', fontWeight: 700 }}> {result.needsCount}개</span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* 입력 필드들 */}
                        <div className="mb-4">
                            <label className="form-label">밭의 면적 (평)</label>
                            <input
                                type="number"
                                name="area"
                                className={`form-control ${errors.area ? 'is-invalid' : ''}`}
                                placeholder="예: 100"
                                value={formData.area}
                                onChange={handleChange}
                                inputMode="decimal"
                            />
                            {errors.area && <div className="invalid-feedback">{errors.area}</div>}
                        </div>

                        <div className="row g-3 mb-4">
                            <div className="col-6">
                                <label className="form-label">비닐 폭 (cm)</label>
                                <input
                                    type="number"
                                    name="width"
                                    className={`form-control ${errors.width ? 'is-invalid' : ''}`}
                                    placeholder="예: 90"
                                    value={formData.width}
                                    onChange={handleChange}
                                    inputMode="numeric"
                                />
                                {errors.width && <div className="invalid-feedback">{errors.width}</div>}
                            </div>

                            <div className="col-6">
                                <label className="form-label">비닐 길이 (m)</label>
                                <input
                                    type="number"
                                    name="height"
                                    className={`form-control ${errors.height ? 'is-invalid' : ''}`}
                                    placeholder="예: 500"
                                    value={formData.height}
                                    onChange={handleChange}
                                    inputMode="numeric"
                                />
                                {errors.height && <div className="invalid-feedback">{errors.height}</div>}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="form-label">롤당 가격 (원)</label>
                            <input
                                type="number"
                                name="price"
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                placeholder="예: 25000"
                                value={formData.price}
                                onChange={handleChange}
                                inputMode="numeric"
                            />
                            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                        </div>

                        <button type="submit" className="btn btn-apple">계산하기</button>
                    </form>

                    {/* 히스토리 섹션 */}
                    {history.length > 0 && (
                        <div className="history-section">
                            <h5 className="fw-bold mb-3 text-center" style={{ fontSize: '16px', color: '#1d1d1f' }}>
                                최근 계산 기록 🕒
                            </h5>
                            <div className="card border-0" style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                                <table className="table table-custom mb-0 text-center">
                                    <thead>
                                        <tr>
                                            <th width="25%">면적</th>
                                            <th width="30%">비닐 규격</th>
                                            <th width="20%">수량</th>
                                            <th width="25%">금액</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.map((record, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span className="fw-bold">{record.request.area}</span>평
                                                </td>
                                                <td>
                                                    <span className="text-muted" style={{ fontSize: '12px' }}>
                                                        {record.request.width}cm × {record.request.height}m
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="text-primary fw-bold">{record.response.needsCount}</span>
                                                </td>
                                                <td>
                                                    <span className="fw-bold">{formatNumber(record.response.totalPrice)}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-center mt-3">
                                <small style={{ color: '#aeaeae', fontSize: '11px' }}>최근 5개 기록만 유지됩니다.</small>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MulchingCalculator;