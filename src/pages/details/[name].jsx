import React from "react";
import { useState, useEffect } from "react";
import { Link } from "gatsby";
import { HiOutlineLink } from "react-icons/hi";

import StreamingServices from "../../components/StreamingServices";
import ShowCard from "../../components/Show-card";
import ShowsRating from "../../components/ShowsRating";

import { minutesToHours } from "../../utils/minutesToHours";
import 'react-dropdown/style.css';

const isBrowser = typeof window !== "undefined"

const Details = ({ location }) => {
    const { state = {} } = location
    const [data, setData] = useState(null);
    const [providers, setProviders] = useState([]);
    const [options, setOptions] = useState([]);
    const [showMethod, setShowMethod] = useState('flatrate')
    const [countrySelected, setCountrySelected] = useState('');
    const [similar, setSimilar] = useState([]);

    useEffect(() => {
        const ContentData = async() => {
            await fetch(`https://api.themoviedb.org/3/${state.type}/${state.contentId}?api_key=${process.env.GATSBY_API_KEY}&language=en-US`) 
            .then(res => res.json())
            .then(data => setData(data))
        } 
        ContentData();

        const providersData = async() => {
            await fetch(`https://api.themoviedb.org/3/${state.type}/${state.contentId}/watch/providers?api_key=${process.env.GATSBY_API_KEY}&language=en-US`) 
            .then(res => res.json())
            .then(data => setProviders(data.results))
        } 
        providersData();

        const similarData = async() => {
            await fetch(`https://api.themoviedb.org/3/${state.type}/${state.contentId}/similar?api_key=${process.env.GATSBY_API_KEY}&language=en-US`) 
            .then(res => res.json())
            .then(data => setSimilar(data.results))
        } 
        similarData();

        verifyCountry();
    }, [state.contentId])

    useEffect(() => {
        Object.keys(providers).forEach((key) => {
            setOptions(options => [...options, {value: key, label: <div className="flex"><img className="w-6 mr-3" src={`https://flagcdn.com/w20/${key.toLowerCase()}.png`}/>{regionNames.of(key)}</div>}])
        })
    }, [providers])
    
    useEffect(() => {
        if(countrySelected.value) {
            let value = countrySelected?.value;
            let idx = options.findIndex((name) => name.value === value);
            let label = <div className="flex"><img className="w-6 mr-3" src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}/>{regionNames.of(value)}</div>
            setCountrySelected({value, label, idx});
        }
    }, [options])
 
    const getSavedContry = () => typeof window !== "undefined" && window.localStorage.getItem('country');
 
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );

    const verifyCountry = () => {       
        if (isBrowser) {
            if (window.localStorage.getItem('country') === null) {
                window.localStorage.setItem('country', JSON.stringify('US'));    
                setCountrySelected({ value: JSON.parse(getSavedContry()) });
            } 
            else {
                setCountrySelected({ value: JSON.parse(getSavedContry()) });
            } 
        }
        
    }

    const handleChange = (option) => {
        typeof window !== "undefined" && window.localStorage.removeItem('country');
        
        let value = option.value;
        let idx = options.findIndex((name) => name.value === value);
        let label = <div className="flex"><img className="w-6 mr-3" src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}/>{regionNames.of(value)}</div>
        setCountrySelected({value, label, idx});

        typeof window !== "undefined" && window.localStorage.setItem('country', JSON.stringify(value));
    }

    return (
        <>
            <div className="w-full" 
                style={{
                    backgroundSize: 'cover', 
                    backgroundImage:`linear-gradient(0deg, rgba(1, 124, 128,0.8), rgba(1, 124, 128,0.8)), url(https://image.tmdb.org/t/p/w1280/${data?.backdrop_path})`,
                    backgroundAttachment: 'fixed',
                }}>
                <div className="flex xs:flex-col lg:flex-row lg:p-10 xs:p-4 lg:mx-20 justify-center items-center">
                        <div>
                            <img 
                                className="rounded-xl lg:w-80 xs:w-64"
                                src={`https://image.tmdb.org/t/p/w1280/${data?.poster_path}`} 
                            />
                            {state.type === 'movie' ? (
                                <span className="flex text-white space-x-5 font-semibold lg:text-lg xs:text-xs ml-3">
                                    <p>{data?.release_date?.split('-')[0]}</p>
                                    <p>{minutesToHours(data?.runtime)}</p>
                                </span>
                                ):(
                                <span className="flex text-white space-x-5 font-semibold lg:text-lg xs:text-xs ml-3">
                                    <p>{data?.first_air_date?.split('-')[0]}</p>
                                    <p>{data?.seasons.length}{data?.seasons.length > 1 ? ' Seasons' : ' Season'}</p>
                                </span>
                            )}
                        </div>
                    <div className="flex lg:w-3/5 xs:w-full flex-col lg:mx-20 xs:mx-2 lg:items-start xs:items-center">
                        <span className="my-5">
                            {state.type === 'movie' ?
                                <h2 className="text-2xl text-white font-bold text-3xl">{data?.title}</h2>
                                :
                                <h2 className="text-2xl text-white font-bold text-3xl">{data?.name}</h2>
                            }
                            <p className="text-gray-100">{data?.tagline}</p>
                        </span>
                        <div className="lg:flex my-5">
                            <div className="space-y-5">
                                <span>
                                    <h3 className="text-white font-bold lg:text-lg xs:text-sm">Overview</h3>
                                    <p className="text-gray-100 lg:text-lg xs:text-xs font-semibold">{data?.overview}</p>
                                </span>
                                <ShowsRating data={data} />
                                <StreamingServices 
                                    setShowMethod={setShowMethod} 
                                    handleChange={handleChange} 
                                    countrySelected={countrySelected} 
                                    showMethod={showMethod} 
                                    providers={providers}
                                    options={options}
                                />
                                <Link className="flex text-white w-28 py-1 px-2 rounded-sm space-x-2 font-semibold" to={data?.homepage} target="_blank">
                                    <HiOutlineLink />
                                    <p className="text-white text-center">Website</p> 
                                </Link>
                            </div>
                            <div className="flex lg:flex-col text-white lg:ml-5">
                                <p className="font-bold lg:text-sm xs-text-xs">Genres</p>
                                {data?.genres.map((genre) => (
                                    <p className="border border-green-300 rounded-lg lg:mb-2 text-center px-2 xs:mx-1 xs:text-xs">{genre.name}</p>
                                ))}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid justify-items-center mt-10">
                {state.type === 'movie' ? (
                    <h2 className="text-gray-500 text-2xl">Similar movies</h2> 
                    ):( 
                    <h2 className="text-gray-500 text-2xl">Similar series</h2>
                )}
                <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 xs:px-2 lg:px-10 lg:w-4/5">
                    {similar && 
                        similar.map((element) => (
                            <ShowCard key={element.id} item={element} type={state.type}/>
                        ))
                    }
                </div>
            </div>
        </>
    )

}

export default Details;