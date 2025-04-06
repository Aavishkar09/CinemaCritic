import React, { useState, useEffect } from "react";
import "./Movies.css";
import { useCategory } from "../../Context/CategoryContext";
import Hero from "../Hero/Hero";
import MovieCard from "../MovieCard/MovieCard";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const { data, searchQuery } = useCategory(); 
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
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

   const handleClick = (movieId) => {
    navigate(`movie/${movieId}`)
   }

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  return (
    <div className="movie-page">
      <div className="movie-container">
        {displayData.map((item, index) => (
          <MovieCard key={item._id} movieName={item.name} movieImage={item.image} onClick={()=>handleClick(item._id)}/>
        ))}
      </div>
    </div>
  );
};

export default Movies;
