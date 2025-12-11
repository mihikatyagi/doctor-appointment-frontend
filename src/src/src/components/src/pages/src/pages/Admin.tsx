import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import * as api from '../api/api'

const Admin: React.FC = () => {
  const { doctors, refreshDoctors } = useAppContext()
  const [name, setName] = useState('')
  const [doctorId, setDoctorId] = useState<number | null>(null)
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('17:00')
  const [interval, setInterval] = useState(15)
  const [loading, setLoading] = useState(false)

  const createNewDoctor = async () => {
    if (!name.trim()) return alert('Enter doctor name')
    setLoading(true)
    try {
      await api.createDoctor(name)
      setName('')
      refreshDoctors()
      alert('Doctor created')
    } catch (err) {
      alert('Failed to create doctor')
    } finally {
      setLoading(false)
    }
  }

  const createSlots = async () => {
    if (!doctorId) return alert('Select doctor')
    if (!date) return alert('Select date')
    setLoading(true)
    try {
      await api.createSlots({ doctor_id: doctorId, date, start_time: startTime, end_time: endTime, interval })
      alert('Slots created')
    } catch (err) {
      alert('Failed to create slots: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <div className="card">
        <h3>Create Doctor</h3>
        <input placeholder="Doctor name" value={name} onChange={(e)=>setName(e.target.value)} />
        <div style={{ marginTop: 8 }}>
          <button className="primary" onClick={createNewDoctor} disabled={loading}>Create</button>
        </div>
      </div>

      <div className="card">
        <h3>Create Slots by Range</h3>
        <div>
          <label>Doctor: </label>
          <select onChange={(e)=>setDoctorId(Number(e.target.value))} defaultValue="">
            <option value="">--select--</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Date: </label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Start time: </label>
          <input type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} />
          <label style={{ marginLeft: 8 }}>End time: </label>
          <input type="time" value={endTime} onChange={e=>setEndTime(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Interval (minutes): </label>
          <input type="number" value={interval} onChange={e=>setInterval(Number(e.target.value))} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="primary" onClick={createSlots} disabled={loading}>Generate Slots</button>
          <button style={{ marginLeft: 8 }} onClick={refreshDoctors}>Refresh Doctors</button>
        </div>
      </div>

      <div className="card">
        <h3>Existing Doctors</h3>
        {doctors.length === 0 ? <div>No doctors yet.</div> : (
          <ul>
            {doctors.map(d => <li key={d.id}>{d.name} (id: {d.id})</li>)}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Admin
