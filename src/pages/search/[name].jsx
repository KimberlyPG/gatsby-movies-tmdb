import React, { useState, useEffect } from "react";

import ShowCard from "../../components/ShowCard";
import Navbar from "../../components/Navbar";
import Skeletons from "../../components/Skeletons";

import { searchContent } from "../../tmdb/search";

const Search = ({ params }) => {
    const param = params[`name`]
    const [moviesView, setMoviesView] = useState(true);
    const [moviesData, setmoviesData] = useState([]);
    const [tvData, setTvData] = useState([]);
    const [status, setStatus] = useState(true);
    const [content, setContent] = useState([]);

    useEffect(() => {
        moviesView === true ? setContent(moviesData) : setContent(tvData) 
    }, [moviesData, tvData, moviesView])

    useEffect(() => {
        searchContent(param, 'movie', setmoviesData, setStatus);   
        searchContent(param, 'tv', setTvData, setStatus);   
    }, [param])
  
  if (status === 'loading') return <Skeletons />
  return (
    <div className="grid justify-items-center">
        <div className="w-4/5">
            <Navbar setMoviesView={setMoviesView}/>
        </div>
        <h2 className="pt-2 flex sm:text-2xl xs:text-xl font-bold text-gray-600">Search result for {`${param}`}</h2>
        <div className="grid lg:gap-5 xs:gap-2 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 
                        lg:gap-9 xs:gap-2 xl:px-10 lg:px-5 xs:px-2 xl:w-4/5 mt-4">
            {content && content?.map((item) => (
                <ShowCard key={item.id} item={item} type={moviesView ? 'movie': 'tv'} page='search'/>
            ))}
        </div>
    </div>
)
}

export default Search;
