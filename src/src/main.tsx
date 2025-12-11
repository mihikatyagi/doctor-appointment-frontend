
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Admin from './pages/Admin'
import BookingPage from './pages/BookingPage'
import NotFound from './pages/NotFound'
import { AppProvider } from './context/AppContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="admin" element={<Admin />} />
            <Route path="booking/:slotId" element={<BookingPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
)
