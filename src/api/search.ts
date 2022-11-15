import { Dispatch, SetStateAction } from "react";
import { SearchShows } from "../types/graphql-types";

export const searchContent = async(param: unknown, slug: string, setData: Dispatch<SetStateAction<SearchShows[]>>, setStatus: Dispatch<SetStateAction<string | number | boolean>>) => {

    await fetch(`https://api.themoviedb.org/3/search/${slug}?api_key=${process.env.GATSBY_API_KEY}&query=${param}&page=1`)
    .then((response) => {
        if(!response.ok) {
            console.log("Something went wrong, code error:", response.status);
            return setStatus(response.status);
        } 
        else {
            setStatus(response.ok)
            return response.json();
        }
    })
    .then((data) => {
        setData(data?.results) 
    })
}

