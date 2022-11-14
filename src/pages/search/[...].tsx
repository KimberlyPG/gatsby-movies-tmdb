import React, {FC} from "react";
import { useState, useEffect } from "react";

import ShowCard from "../../components/Show-card";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";

import { searchContent } from "../../api/search";
import { SearchMovies, SearchTv } from "../../types/graphql-types";

type SearchProps = {
    params: string;
}

const Search: FC<SearchProps> = ({ params }) => {
    const param = params[`*` as keyof typeof params]
    const [moviesView, setMoviesView] = useState(true);
    const [moviesData, setmoviesData] = useState(null);
    const [tvData, setTvData] = useState(null);
    const [status, setStatus] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        moviesView === true ? setContent(moviesData) : setContent(tvData) 
    }, [moviesData, tvData, moviesView])
    console.log("list", content);
    useEffect(() => {
        setStatus('Loading');

        searchContent(param, 'movie', setmoviesData, setStatus);   
        searchContent(param, 'tv', setTvData, setStatus);   
    }, [param])

  return (
    <Layout>
        {status === true ? (
            <>
                <div className="grid justify-items-center">
                    <div className="w-4/5">
                        <Navbar setMoviesView={setMoviesView}/>
                    </div>
                    <h2 className="pt-2 flex text-2xl font-bold text-gray-600">Search result for {`${param}`}</h2>
                    <div className="grid grid-cols-5 p-10 w-4/5">
                        {content && content?.results?.map((item) => (
                            <ShowCard key={item.id} item={item} type={moviesView ? 'movie': 'tv'}/>
                        ))}
                    </div>
                </div>
            </>
        ):(
            <div>Loading</div>
        ) 
        }
    </Layout>
  )
}

export default Search;
