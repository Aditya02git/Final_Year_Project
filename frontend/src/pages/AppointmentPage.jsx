import React from 'react'
import { AppWrapper } from '../layouts/AppWrapper'
import { Appointment } from '../components/Appointment/Appointment'
import { useAuthStore } from '../store/useAuthStore' // Import your auth store

const AppointmentPage = () => {
  const { authUser } = useAuthStore() // Get the authenticated user

  return (
    <AppWrapper>
        <Appointment user={authUser} />
    </AppWrapper>
  )
}

export default AppointmentPage