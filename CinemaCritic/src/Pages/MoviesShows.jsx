import React, { useState, useEffect } from "react";
import Items from "../Components/Items/Items";
import Pagination from "@mui/material/Pagination";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./MoviesShows.css";
import "../Components/Items/Items.css";
import { useCategory } from "../Context/CategoryContext";

const Movies = () => {
  const { data, searchQuery } = useCategory(); 
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const [sortField, setSortField] = useState("year");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortField = (event, newField) => {
    if (newField !== null) {
      setSortField(newField);
    }
  };

  const handleSortOrder = (event, newOrder) => {
    if (newOrder !== null) {
      setSortOrder(newOrder);
    }
  };

  const filteredData = [...data]
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortField === "duration") {
        return sortOrder === "asc" ? a.duration - b.duration : b.duration - a.duration;
      } else {
        return sortOrder === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
      }
    });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]); // ✅ Reset page when searchQuery changes

  return (
    <div className="movie-page">
      <h2>All Movies</h2>
      
      <div className="sorting-controls" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <ToggleButtonGroup value={sortField} exclusive onChange={handleSortField} aria-label="Sort Field">
          <ToggleButton value="year">Year</ToggleButton>
          <ToggleButton value="rating">Rating</ToggleButton>
          <ToggleButton value="duration">Duration</ToggleButton>
          <ToggleButton value="name">Name</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup value={sortOrder} exclusive onChange={handleSortOrder} aria-label="Sort Order" style={{ marginTop: "10px" }}>
          <ToggleButton value="asc">Ascending</ToggleButton>
          <ToggleButton value="desc">Descending</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="movie-container">
        {displayData.map((item, index) => (
          <Items key={index} poster={item.image} name={item.name} rating={item.rating} year={item.year} />
          
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
    </div>
  );
};

export default Movies;
