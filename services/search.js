const search = async(req,res)=>{
    const {movie} = req.body;
    const data = await fetch(`http://www.omdbapi.com/?apikey=54c575&s=${movie}`)
    return res.json({message:"Success",movies:await data.json()})
}
module.exports = search 