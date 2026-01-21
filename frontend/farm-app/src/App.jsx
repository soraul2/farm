import { Routes, Route } from 'react-router-dom' // 1. 기능 가져오기
import MulchingCalculator from './pages/MulchingCalculator' // 2. 컴포넌트 임포트 (경로는 실제 파일 위치에 맞게)
import Home from './pages/Home' // Home 임포트
import './App.css'

function App() {
  return (
    <div>
      {/* Routes 안에 Route들을 정의합니다 */}
      <Routes>
        {/* 원하시는 계산기 주소 (예: localhost:5173/calculator) */}
        <Route path="/" element={<Home />} />
        <Route path="/mulchingCalculator" element={<MulchingCalculator />} />
      </Routes>
    </div>
  )
}

export default App