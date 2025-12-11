import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  )
}

export default App

