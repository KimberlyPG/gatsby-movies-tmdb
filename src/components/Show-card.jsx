import React from 'react'
import { navigate } from 'gatsby';

import { AiFillStar } from "react-icons/ai";

const ShowCard = ({ item, type }) => {
  if(item.poster_path === null) return 
  return (
    <div className='p-5' onClick={() => navigate(`/details/${item.title}`, {state: {contentId: item.id, type: type }})}>
        <div className='relative cursor-pointer'>
            <span className='flex absolute bottom-0 p-1 text-white space-x-5 text-xs font-bold'>
                {item.release_date &&
                  <p className='bg-gray-600 bg-opacity-60 rounded-lg px-2 py-1'>{item?.release_date?.split("-")[0]}</p>
                }
                <div className='bg-gray-600 bg-opacity-60 rounded-lg px-2 py-1 border border-green-400'>{item.adult === true ? <p>18+</p> : <p>ALL</p> }</div>    
            </span>
            <img 
                className="rounded-xl hover:opacity-80"
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`} 
                alt={`${item.title} poster`}
            />
        </div>
        <h3 className='font-bold text-sm'>{item.title}</h3>
        <span className='flex items-center space-x-2 text-sm'>
            <AiFillStar className='text-yellow-500' />
            <p className='text-gray-500'>{item.vote_average}</p>
        </span>
    </div>
  )
}

export default ShowCard;