import { createContext, useContext, useReducer, useState, useEffect, type ReactNode } from 'react'
import type {
  DriverAssignment,
  DriverProfile,
  DriverProfileFormData,
  DriverStats,
  TripRecord,
} from '../types/driver'
import {
  driverProfile as initialProfile,
  driverStats,
  tripHistory,
} from '../data/driverData'

interface DriverState {
  profile: DriverProfile
}

type DriverAction = { type: 'UPDATE_PROFILE'; data: DriverProfileFormData }

function profileReducer(state: DriverState, action: DriverAction): DriverState {
  if (action.type === 'UPDATE_PROFILE') {
    return {
      profile: {
        ...state.profile,
        phone: action.data.phone,
        truckPlate: action.data.truckPlate,
      },
    }
  }
  return state
}

interface DriverContextValue {
  profile: DriverProfile
  assignment: DriverAssignment | null
  stats: DriverStats
  trips: TripRecord[]
  loading: boolean
  updateProfile: (data: DriverProfileFormData) => void
}

const DriverContext = createContext<DriverContextValue | null>(null)

export function DriverProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(profileReducer, { profile: initialProfile })

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <DriverContext.Provider
      value={{
        profile: state.profile,
        assignment: state.profile.assignment ?? null,
        stats: driverStats,
        trips: tripHistory,
        loading,
        updateProfile: data => dispatch({ type: 'UPDATE_PROFILE', data }),
      }}
    >
      {children}
    </DriverContext.Provider>
  )
}

export function useDriver(): DriverContextValue {
  const ctx = useContext(DriverContext)
  if (!ctx) throw new Error('useDriver must be used inside DriverProvider')
  return ctx
}
