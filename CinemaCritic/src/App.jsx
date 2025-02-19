import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar';

import MoviesShows from './Pages/MoviesShows';
import AdminLogin from './Pages/AdminLogin';
import Admin from './Pages/Admin';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<MoviesShows/>}/>
        <Route path='/login' element={<AdminLogin/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
