import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'; // 추가
import { BrowserRouter } from 'react-router-dom' // 1. 임포트 추가
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
  <HelmetProvider> {/* 전체를 감싸줍니다 */}
    <BrowserRouter> {/* 2. 감싸기 */}
      <App />
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
