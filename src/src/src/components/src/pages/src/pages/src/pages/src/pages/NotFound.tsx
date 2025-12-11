import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => (
  <div className="container">
    <h2>404 - Page not found</h2>
    <div className="card">
      <Link to="/">Go to Home</Link>
    </div>
  </div>
)

export default NotFound
