import React, { useEffect } from "react"
import { navigate } from "gatsby";

const MovieAndTvCard = ({ data, name, type }) => {
    console.log("data", data)

    return (
        <div className="relative hover:opacity-70 h-full cursor-pointer" onClick={() => navigate(`/details/${name}`, {state: {contentId: data.id, type: type }})}>
            {data.vote_average !== 0 && data.vote_average!== undefined &&
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