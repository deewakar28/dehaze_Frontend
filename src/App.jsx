import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dehaze from './pages/Dehaze'
import RealTimeDehaze from './pages/RealTime'
import VideoDehaze from './pages/VideoDehaze'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dehaze/>} />
      <Route path="/video" element={<VideoDehaze/>} />
      <Route path="/real-time" element={<RealTimeDehaze/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App