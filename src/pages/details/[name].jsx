import React from "react";
import { useState, useEffect } from "react";

import Layout from "../../components/Layout";
import StreamingServices from "../../components/Streaming-services";
import ContentRating from "../../components/Content-rating";
import ShowCard from "../../components/Show-card";

import { minutesToHours } from "../../utils/minutesToHours";
import 'react-dropdown/style.css';

const Details = ({ location }) => {
    const { state = {} } = location
    // const countryName = localStorage.getItem('country');
    const [countryName, setCountryName] = useState(null);
    const [data, setData] = useState(null);
    const [providers, setProviders] = useState([]);
    const [options, setOptions] = useState([]);
    const [showMethod, setShowMethod] = useState('flatrate')
    const [countrySelected, setCountrySelected] = useState({value: JSON.parse(countryName)});
    const [similar, setSimilar] = useState([]);
    console.log("selected", countrySelected)
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
            console.log("value", value, "idx", idx)
            let label = <div className="flex"><img className="w-6 mr-3" src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}/>{regionNames.of(value)}</div>
            setCountrySelected({value, label, idx});
        }
    }, [options])
    
    const verifyCountry = () => {
        if (localStorage.getItem('country') === null) {
            localStorage.setItem('country', JSON.stringify('US'));    
            setCountryName(localStorage.getItem('country'));
        } 
        else setCountryName(localStorage.getItem('country'));
    }

    const handleChange = (option) => {
        localStorage.removeItem('country');
        let value = option.value;
        let idx = options.findIndex((name) => name.value === value);
        let label = <div className="flex"><img className="w-6 mr-3" src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}/>{regionNames.of(value)}</div>
        setCountrySelected({value, label, idx});

        localStorage.setItem('country', JSON.stringify(value));
    }

    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
      );


    return (
        <Layout>
            <div className="w-full" 
                style={{
                    backgroundSize: 'cover', 
                    backgroundImage:`linear-gradient(0deg, rgba(1, 124, 128,0.8), rgba(1, 124, 128,0.8)), url(https://image.tmdb.org/t/p/w1280/${data?.backdrop_path})`,
                    backgroundAttachment: 'fixed'
                }}>
                <div className="flex p-10 mx-20 justify-center" >
                    <div>
                        <img 
                            className="rounded-xl w-80"
                            src={data?.poster_path === null ? `https://via.placeholder.com/300x460.png/AAF0C1/000000?text=No+Image+Available` :`https://image.tmdb.org/t/p/w1280/${data?.poster_path}`} 
                        />
                        {state.type === 'movie' ? (
                            <span className="flex text-white space-x-5 font-semibold text-lg ml-3">
                                <p>{data?.release_date?.split('-')[0]}</p>
                                <p>{minutesToHours(data?.runtime)}</p>
                            </span>
                            ):(
                            <span className="flex text-white space-x-5 font-semibold text-lg ml-3">
                                <p>{data?.first_air_date?.split('-')[0]}</p>
                                <p>{data?.seasons.length}{data?.seasons.length > 1 ? ' Seasons' : ' Season'}</p>
                            </span>
                        )}
                    </div>
                    <div className="flex w-3/5 flex-col mx-20">
                        <span className="my-5">
                            {state.type === 'movie' ?
                                <h2 className="text-2xl text-white font-bold text-3xl">{data?.title}</h2>
                                :
                                <h2 className="text-2xl text-white font-bold text-3xl">{data?.name}</h2>
                            }
                            <p className="text-gray-100">{data?.tagline}</p>
                        </span>
                        <div className="flex">
                            <div className="space-y-5">
                                <span>
                                    <h3 className="text-white font-bold text-lg">Overview</h3>
                                    <p className="text-gray-100 text-lg font-semibold">{data?.overview}</p>
                                </span>
                                <ContentRating data={data} />
                                <StreamingServices 
                                    setShowMethod={setShowMethod} 
                                    handleChange={handleChange} 
                                    countrySelected={countrySelected} 
                                    showMethod={showMethod} 
                                    providers={providers}
                                    options={options}
                                />
                            </div>
                            <div className="flex flex-col text-white ml-5">
                                <p className="font-bold">Genres</p>
                                {data?.genres.map((genre) => (
                                    <p className="border border-green-300 rounded-lg mb-2 text-center px-2">{genre.name}</p>
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
                <div className="grid grid-cols-5 px-10 w-4/5">
                    {similar && 
                        similar.map((element) => (
                            <ShowCard key={element.id} item={element} type={state.type}/>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )

}

export default Details;