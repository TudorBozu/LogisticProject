import { Outlet } from 'react-router-dom'
import { DriverProvider, useDriver } from '../../context/DriverContext'
import DriverNavbar from '../../components/driver/DriverNavbar'

function Shell() {
  const { profile, loading } = useDriver()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-[3px] border-blue-600 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-400 dark:text-slate-500">Se încarcă...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <DriverNavbar driverName={profile.name} driverInitials={profile.initials} />
      <Outlet />
    </div>
  )
}

export default function DriverLayout() {
  return (
    <DriverProvider>
      <Shell />
    </DriverProvider>
  )
}
