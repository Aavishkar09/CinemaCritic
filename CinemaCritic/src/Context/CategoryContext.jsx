import { useState, useContext, useEffect, createContext } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [data, setData] = useState([]);  
    const [trendingData, setTrendingData] = useState([]);  
    const [searchQuery, setSearchQuery] = useState("");

    const backendURL = `${import.meta.env.VITE_API_URL}`;

    // Fetch all movies
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${backendURL}/api`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, []);

    // Fetch trending movies
    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await fetch(`${backendURL}/api/trending/`);
                const result = await response.json();
                setTrendingData(result);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            }
        };
        fetchTrendingMovies();
    }, []);

    return (
        <CategoryContext.Provider value={{ data, trendingData, searchQuery, setSearchQuery, backendURL }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);
