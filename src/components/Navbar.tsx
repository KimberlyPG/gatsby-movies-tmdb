import React, {FC} from 'react'
import { useState } from "react";

type NavbarProps = {
  setMoviesView:React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar:FC<NavbarProps> = ({ setMoviesView}) => {
    const [moviesButtonBg, setMoviesButtonBg] = useState('#1B5BA9');
    const [showsButtonBg, setShowsButtonBg] = useState('transparent');
    const [moviesButtonColor, setMoviesButtonColor] = useState('#FFFFFF');
    const [showsButtonColor, setShowsButtonColor] = useState('#C2C8CD');

    const toggle = (value:boolean) => {
        setMoviesView(value);
        if(value) {
          setMoviesButtonBg('#1B5BA9');
          setMoviesButtonColor('#FFFFFF');
          setShowsButtonBg('transparent');
          setShowsButtonColor('#C2C8CD');
        }
        else {
          setMoviesButtonBg('transparent');
          setMoviesButtonColor('#C2C8CD');
          setShowsButtonBg('#1B5BA9');
          setShowsButtonColor('#FFFFFF')
        }
      }
  return (
    <div className='mx-2 mt-10'>   
        <div className="flex space-x-5 mb-10">
          <button className="text-gray-500 rounded-xl px-4" onClick={() => toggle(true)} style={{backgroundColor: `${moviesButtonBg}`, color: `${moviesButtonColor}`}}>Movies</button>
          <button className="text-gray-500 rounded-xl px-4" onClick={() => toggle(false)} style={{backgroundColor: `${showsButtonBg}`, color: `${showsButtonColor}`}}>Tv Shows</button>
        </div>
    </div>
  )
}

export default Navbar;
