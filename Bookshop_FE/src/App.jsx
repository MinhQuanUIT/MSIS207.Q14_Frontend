import React from "react"
import AppRoutes from './routes/AppRoutes'
import './styles/App.css'

export default function App() {
  console.log('App component rendered')
  return (
    <div>
      <AppRoutes />
    </div>
  )
}
