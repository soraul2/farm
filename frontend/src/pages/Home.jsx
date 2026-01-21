import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 백엔드 데이터 Fetch 시뮬레이션
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        // 실제 환경: const response = await fetch('/api/menus'); const data = await response.json();
        // 시뮬레이션: 0.8초 후 더미 데이터 반환
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                id: 'mulching-calc',
                title: 'Mulching Calculator',
                description: '농업용 비닐 소요량 및 견적 계산',
                icon: '🌱',      // 타이틀 앞 이모지
                subIcon: '🚜',   // 설명 뒤 이모지
                path: '/mulchingCalculator',
                isNew: true
              },
              // 추후 기능 추가 예시:
              // { id: 'market-price', title: '경매 단가 조회', description: '오늘의 시세 확인', icon: '💰', path: '/market' }
            ]);
          }, 800);
        });
        
        setMenuItems(response);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
        // 에러 처리 로직 (예: 사용자에게 알림)
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // 페이지 이동 핸들러
  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    // React Router 사용 시: navigate(path);
    window.location.href = path; 
  };

  return (
    <div className="app-container">
      <main className="main-card">
        {/* 헤더 영역 */}
        <header className="header">
          <h1>Smart Farm Tools</h1>
          <p>농업 생산성 향상을 위한 도구 모음</p>
        </header>

        {/* 구분선 및 안내 문구 (검색창 대체) */}
        <hr className="divider" />
        <p className="instruction-text">아래의 도구를 선택하여 시작하세요.</p>

        {/* 콘텐츠 영역 */}
        {loading ? (
          <div className="loading">로딩 중...</div>
        ) : (
          <div className="nav-grid">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className="nav-card" 
                onClick={() => handleNavigation(item.path)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleNavigation(item.path)} // 접근성 추가
              >
                <div className="nav-info">
                  <div className="nav-title-row">
                    {item.icon && <span className="nav-emoji">{item.icon}</span>}
                    <span className="nav-title">
                      {item.title}
                      {item.isNew && <span className="new-indicator">●</span>}
                    </span>
                  </div>
                  <div className="nav-desc-row">
                    <span className="nav-desc">{item.description}</span>
                    {item.subIcon && <span className="nav-emoji" style={{fontSize: '16px'}}>{item.subIcon}</span>}
                  </div>
                </div>
                <div className="nav-icon-arrow">
                  ›
                </div>
              </div>
            ))}
            
            {menuItems.length === 0 && !loading && (
              <div className="instruction-text" style={{textAlign: 'center'}}>
                사용 가능한 도구가 없습니다.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;