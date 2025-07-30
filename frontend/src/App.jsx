import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {


  return (
    <>
   <ToastContainer position="top-right" autoClose={2000} theme="light" className="toast-container" />
    <Navbar/>
    <Outlet/>

    </>
  )
}

export default App
