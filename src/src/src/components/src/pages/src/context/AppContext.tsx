
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Doctor, Slot } from '../types.d'
import * as api from '../api/api'

type AppState = {
  doctors: Doctor[]
  loading: boolean
  refreshDoctors: () => Promise<void>
  fetchSlotsForDoctor: (id: number) => Promise<Slot[]>
}

const AppContext = createContext<AppState | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)

  const refreshDoctors = async () => {
    setLoading(true)
    try {
      const list = await api.fetchDoctors()
      setDoctors(list)
    } catch (err) {
      console.error('Failed to load doctors', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshDoctors()
  }, [])

  const fetchSlotsForDoctor = async (id: number) => {
    return api.fetchSlots(id)
  }

  return (
    <AppContext.Provider value={{ doctors, loading, refreshDoctors, fetchSlotsForDoctor }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const c = useContext(AppContext)
  if (!c) throw new Error('useAppContext must be used inside AppProvider')
  return c
}
