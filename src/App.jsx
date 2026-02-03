import React from 'react'
import { BrowserRoute, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  return (
    <div>
      <BrowserRoute>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/product/:barcode" element={<ProductDetail />} />
        </Routes>
      </BrowserRoute>
    </div>
  )
}

export default App
