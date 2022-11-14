import React from "react";
import { SearchResultProps } from "../pages/search/[...]";


export const searchContent = async (param:unknown, slug:string, setData:React.Dispatch<React.SetStateAction<SearchResultProps | null>>, setStatus:React.Dispatch<React.SetStateAction<string|boolean>>) => {
    await fetch(`https://api.themoviedb.org/3/search/${slug}?api_key=${process.env.GATSBY_API_KEY}&query=${param}&page=1`)
    .then((response:any) => {
        if(!response.ok) {
            throw new Error(response.status);
        } 
        else {
            setStatus(response.ok)
            return response.json();
        }
    })
    .then(data => {
        setData(data)
    })
}