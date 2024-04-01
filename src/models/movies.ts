import mongoose from "mongoose";

const movies = new mongoose.Schema(
    {
        title:String,
        year:Number,
        director:String,
        duration:Number,
        rate:Number,
        poster:String,
        genre:String
    }
)

const Movies = mongoose.model('Movies', movies);

export default Movies;