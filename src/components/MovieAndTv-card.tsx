import * as React from "react"
import { navigate } from "gatsby";
import { PopularMovies } from '../types/graphql-types';

type MovieandTVProps ={
    data: PopularMovies;
    name: string;
    type: string;
}

const MovieAndTvCard: React.FC<MovieandTVProps> = ({ data, name, type }) => {

    return (
        <div className="relative hover:opacity-70 h-full cursor-pointer" onClick={() => navigate(`/details/${name}`, {state: {contentId: data.id, type: type }})}>
            {data.vote_average && 
                <p className="text-xs text-green-600 absolute m-3 bg-gray-200 bg-opacity-300 p-2 rounded-full">{data.vote_average}</p>
            }
            {data.poster_path.original !== undefined ? (
                <img 
                    className="h-full rounded-xl"
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path.original}`} 
                />
                ):
                ( 
                <img 
                    className="h-full rounded-xl"
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`} 
                />
                )
            }
        </div>         
    )
}

export default MovieAndTvCard;