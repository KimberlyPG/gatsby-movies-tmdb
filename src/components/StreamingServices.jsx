import React from 'react'
import Dropdown from 'react-dropdown';

import StreamingImg from './StreamingImg';

const StreamingServices = ({ setShowMethod, handleChange, countrySelected, showMethod, providers, options }) => {

  return (
    <div className="mt-5 text-white">
        <p className="font-bold">Stream</p>
        <div className="flex space-x-5 h-8 mb-3">
            <button className="mb-3" onClick={() => setShowMethod('flatrate')}>Flatrate</button>
            <button className="mb-3" onClick={() => setShowMethod('buy')}>Buy</button>
            <button className="mb-3" onClick={() => setShowMethod('rent')}>Rent</button>
            <Dropdown 
                className="text-xs ml-10 w-48 text-xs"
                options={options} 
                onChange={handleChange} 
                value={countrySelected} 
                placeholder="Select an option"
            />
        </div>
        <div className="flex space-x-5">
            {showMethod === 'flatrate' &&
                Object.values(providers)[countrySelected.idx]?.flatrate?.map((item) => (
                    <StreamingImg item={item}/> 
                ))
            }
            {showMethod === 'buy' &&
                Object.values(providers)[countrySelected.idx]?.buy?.map((item) => (
                    <StreamingImg item={item}/>  
                ))
            }
            {showMethod == 'rent' &&
                Object.values(providers)[countrySelected.idx]?.rent?.map((item) => (
                    <StreamingImg item={item}/>  
                ))
            }
        </div>
    </div>
  )
}

export default StreamingServices;
