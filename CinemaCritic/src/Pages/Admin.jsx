import React, { useEffect, useState } from 'react'
import Items from '../Components/Items/Items'
import { useCategory } from '../Context/CategoryContext';
import Pagination from "@mui/material/Pagination";
import { Button } from '@mui/material';
import './MoviesShows.css'
import AddMovie from '../Components/AddMovie/AddMovie';

const Admin = () => {
  const { data, searchQuery, setSearchQuery,setData} = useCategory();
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;
  

    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const displayData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);


      useEffect(() => {
        setPage(1);
      }, [searchQuery]);

      const handleEdit = (movie) => {
        setEditMovie(movie); // Set the selected movie for editing
        setShowAddMovie(true);
      };
    
      const handleDelete = (id) => {
        console.log("Delete item with ID:", id);
        // Implement your delete logic here
      };

      const handleAddMovie = () => {
        setEditMovie(null); // Reset editMovie to ensure blank form
        setShowAddMovie(true);
      };
      
      const handleClose = () => {
        setShowAddMovie(false);
        setEditMovie(null);
      };
    return (
      <div>
      {showAddMovie ? (
        <AddMovie movie={editMovie} onClose={handleClose} />
      ) : (
        <>
          <Button size='large' onClick={handleAddMovie}>Add Movie</Button>
          <div className='movie-container'>
            {displayData.map((item, index) => (
              <div key={index}>
                <Items poster={item.image} name={item.name} rating={item.rating} year={item.year} />
                <Button variant="contained" color="primary" onClick={() => handleEdit(item)} style={{ marginLeft: "10px", marginBottom: "100px" }}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)} style={{ marginLeft: "10px", marginBottom: "100px" }}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <div className="pagination-container">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </div>
        </>
      )}
    </div>
    );
};

export default Admin