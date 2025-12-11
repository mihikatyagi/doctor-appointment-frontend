import React from 'react'
import type { Slot } from '../types.d'
import { Link } from 'react-router-dom'

const SlotCard: React.FC<{ slot: Slot }> = ({ slot }) => {
  const time = new Date(slot.slot_time).toLocaleString()
  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontWeight: 600 }}>{time}</div>
        <div style={{ fontSize: 12, color: '#666' }}>{slot.is_booked ? 'Booked' : 'Available'}</div>
      </div>
      <div>
        {slot.is_booked ? (
          <button disabled>Unavailable</button>
        ) : (
          <Link to={`/booking/${slot.id}`}><button className="primary">Book</button></Link>
        )}
      </div>
    </div>
  )
}

export default SlotCard
