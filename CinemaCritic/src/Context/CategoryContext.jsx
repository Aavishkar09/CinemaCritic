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
                const response = await fetch('http://localhost:4001/api/admin/allcine');
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
        <CategoryContext.Provider value={{data,searchQuery, setSearchQuery}}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategory = () => useContext(CategoryContext);