import React from 'react'

type ItemImage = {
  item:{
    logo_path:string;
    provider_name:string;
      }
}

const StreamingImg:React.FC<ItemImage> = ({ item }: ItemImage ) => {
  return (
    <img 
        className="w-16 rounded-sm"
        src={`https://image.tmdb.org/t/p/w500${item.logo_path}`} 
        alt={`${item.provider_name} image`} 
    /> 
  )
}

export default StreamingImg;