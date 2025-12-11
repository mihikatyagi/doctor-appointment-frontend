import type { Doctor, Slot, Booking } from '../types.d'

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

// Doctors
export const fetchDoctors = async (): Promise<Doctor[]> => request('/doctors')

// Slots for a doctor
export const fetchSlots = async (doctorId: number): Promise<Slot[]> =>
  request(`/doctors/${doctorId}/slots`)

// Admin: create doctor
export const createDoctor = async (name: string): Promise<Doctor> =>
  request('/admin/doctors', { method: 'POST', body: JSON.stringify({ name }) })

// Admin: create slots by range (start, end, intervalMinutes)
export const createSlots = async (payload: {
  doctor_id: number;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  interval: number; // minutes
}) => request('/admin/slots', { method: 'POST', body: JSON.stringify(payload) })

// Booking
export const createBooking = async (slotId: number, userName: string): Promise<Booking> =>
  request('/bookings', { method: 'POST', body: JSON.stringify({ slotId, userName }) })
