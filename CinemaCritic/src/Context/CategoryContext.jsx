import { useState,useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({children})=>{
    const [data,setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const URL = "https://cinemacritic-production.up.railway.app";


    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch(`${URL}/api/admin/allcine`);
                const result = await response.json();
                setData(result);
            }
            catch(error){
                console.log(error);            
            }
        }
        fetchData();
    },[])
    return(
        <CategoryContext.Provider value={{data,searchQuery, setSearchQuery,URL}}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategory = () => useContext(CategoryContext);