import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>Doctor Booking</Link>
        </div>
        <nav>
          <Link to="/" style={{ color: 'white', marginRight: 12 }}>Home</Link>
          <Link to="/admin" style={{ color: 'white' }}>Admin</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

