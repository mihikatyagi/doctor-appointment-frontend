import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import SlotList from '../components/SlotList'
import * as api from '../api/api'

const Home: React.FC = () => {
  const { doctors, loading, refreshDoctors } = useAppContext()
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [slots, setSlots] = useState<any[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  useEffect(() => {
    if (doctors.length && selectedDoctor === null) {
      setSelectedDoctor(doctors[0].id)
    }
  }, [doctors])

  useEffect(() => {
    if (selectedDoctor !== null) {
      fetchSlots(selectedDoctor)
    }
  }, [selectedDoctor])

  async function fetchSlots(id: number) {
    setLoadingSlots(true)
    try {
      const s = await api.fetchSlots(id)
      setSlots(s)
    } catch (err) {
      console.error(err)
      alert('Failed to load slots')
    } finally {
      setLoadingSlots(false)
    }
  }

  return (
    <div className="container">
      <h2>Book an Appointment</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={refreshDoctors} style={{ marginRight: 8 }}>Refresh Doctors</button>
      </div>
      {loading ? <Loading /> : (
        <div className="card">
          <label>Choose Doctor: </label>
          <select value={selectedDoctor ?? ''} onChange={(e) => setSelectedDoctor(Number(e.target.value))}>
            {doctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        {loadingSlots ? <Loading /> : <SlotList slots={slots} />}
      </div>
    </div>
  )
}

export default Home

