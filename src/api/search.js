export const searchContent = async (param, slug, setData, setStatus) => {
    await fetch(`https://api.themoviedb.org/3/search/${slug}?api_key=${process.env.GATSBY_API_KEY}&query=${param}&page=1`)
    .then((response) => {
        if(!response.ok) {
            throw new Error(response.status);
        } 
        else {
            setStatus(response.ok)
            return response.json();
        }
    })
    .then(data => {
        setData(data)
    })
}