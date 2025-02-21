import React, { useRef, useState , useEffect} from 'react'
import './Navbar.css'
import { Link, useLocation,useNavigate} from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useCategory } from '../Context/CategoryContext';
import TextField from '@mui/material/TextField';


const Navbar = () => {
  const [menu,setMenu] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useCategory();   

  useEffect(() => {
      navigate("/");
  }, []); 

  return (
    <div className='navbar-container'>
        <div className='navbar-left'>
            <Link style={{ textDecoration: 'none' }} to='/'>Cinema Critic</Link>
        </div>
        <div className='navbar-right'>
        <TextField
            id="outlined-basic"
            label="Search Movies/Shows"
            variant="outlined"
            fullWidth
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
        />
          <Button size="large" color='black' sx={{ ml: 6 }} onClick={()=>navigate("/login")}>Admin</Button>
        </div>
    </div>
  ) 
}

export default Navbar