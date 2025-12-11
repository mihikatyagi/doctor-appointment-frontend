import React from 'react'
import type { Slot } from '../types.d'
import SlotCard from './SlotCard'

const SlotList: React.FC<{ slots: Slot[] }> = ({ slots }) => {
  if (!slots.length) return <div className="card">No slots found.</div>
  return (
    <div>
      {slots.map((s) => (
        <SlotCard key={s.id} slot={s} />
      ))}
    </div>
  )
}

export default SlotList
