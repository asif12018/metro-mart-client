import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className="container mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
