import React, {FC} from 'react'
import { navigate } from 'gatsby';

import { AiFillStar } from "react-icons/ai";
import { MovieResult, PopularShows, TvResult } from "../types/graphql-types"

type ShowCardProp={
  item:TvResult | MovieResult;
  type:string;
}

const ShowCard:FC<ShowCardProp>= ({ item, type }) => {
  var returnedDate:string

  if('release_date' in item) returnedDate = item.release_date 
  else returnedDate = item.first_air_date

  return (
    <div className='p-5' onClick={() => navigate(`/details/${'title' in item ? item.title : item.name}`, {state: {contentId: item.id, type: type }})}>
        <div className='relative cursor-pointer'>
            <span className='flex absolute bottom-0 p-1 text-white space-x-5 text-xs font-bold'>
                {returnedDate &&
                  <p className='bg-gray-600 bg-opacity-60 rounded-lg px-2 py-1'>{returnedDate?.split("-")[0]}</p>
                }
                <div className='bg-gray-600 bg-opacity-60 rounded-lg px-2 py-1 border border-green-400'>{'adult' in item ? (item.adult === true ? <p>18+</p> : <p>ALL</p>): <p>N/A</p>}</div>    
            </span>
            <img 
                className="rounded-xl hover:opacity-80"
                src={item.poster_path === null ? `https://via.placeholder.com/300x460.png/AAF0C1/000000?text=No+Image+Available`
                : `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`} 
                alt={`${'title' in item ? item.title : item.name} poster`}
            />
        </div>
        <h3 className='font-bold text-sm'>{'title' in item ? item.title : item.name}</h3>
        <span className='flex items-center space-x-2 text-sm'>
            <AiFillStar className='text-yellow-500' />
            <p className='text-gray-500'>{item.vote_average}</p>
        </span>
    </div>
  )
}

export default ShowCard;