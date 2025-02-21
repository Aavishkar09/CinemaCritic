import { useState,useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({children})=>{
    const [data,setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch(`https://cinemacritic-production.up.railway.app/api/admin/allcine`);
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
        <CategoryContext.Provider value={{data,searchQuery, setSearchQuery,backendURL}}>
            {children}
        </CategoryContext.Provider>
    )
}

export const backendURL = "https://cinemacritic-production.up.railway.app" ;

export const useCategory = () => useContext(CategoryContext);
