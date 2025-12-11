import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as api from '../api/api'

const BookingPage: React.FC = () => {
  const { slotId } = useParams<{ slotId: string }>()
  const navigate = useNavigate()
  const [slot, setSlot] = useState<any | null>(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!slotId) return
    const fetchSlot = async () => {
      try {
        // backend does not have direct /slots/:id in our small design; as a workaround
        // we will fetch doctors and then find slot by id (server should ideally have endpoint)
        const doctors = await api.fetchDoctors()
        let found = null
        for (const d of doctors) {
          const slots = await api.fetchSlots(Number(d.id))
          const s = slots.find((x:any) => String(x.id) === String(slotId))
          if (s) { found = s; break }
        }
        setSlot(found)
      } catch (err) {
        console.error(err)
        alert('Failed to load slot')
      }
    }
    fetchSlot()
  }, [slotId])

  const doBooking = async () => {
    if (!slot) return alert('Slot not found')
    if (!name.trim()) return alert('Enter your name')
    setLoading(true)
    try {
      const booking = await api.createBooking(Number(slot.id), name)
      alert(`Booking created with status: ${booking.status}`)
      navigate('/')
    } catch (err) {
      alert('Failed to book: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  if (!slot) return <div className="card">Loading slot information...</div>

  return (
    <div className="container">
      <h2>Book: {new Date(slot.slot_time).toLocaleString()}</h2>
      <div className="card">
        <div>
          <label>Your Name</label><br />
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="primary" onClick={doBooking} disabled={loading}>Confirm Booking</button>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
