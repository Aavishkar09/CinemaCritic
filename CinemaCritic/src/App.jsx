import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './Components/Navbar';
import AdminLogin from './Pages/AdminLogin';
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import { useRef } from 'react';


function App() {
  const moviesRef = useRef(null);
  return (
    <BrowserRouter>
      <Navbar moviesRef={moviesRef}/>
        <Routes>
          <Route path='/' element={<Home moviesRef={moviesRef}/>}/>
          <Route path='/movie/:id' element={<MovieDetails/>}/>
          <Route path='/login' element={<AdminLogin/>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
