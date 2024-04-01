import { NextFunction, Request,Response } from "express";
import { validateMovie, movie, movieType } from '../schemas/movie.shemas';
import Movies from "../models/movies";



//middleware personalizado
export const getMovie = async (req:Request,res:Response,next:NextFunction) => {
    let movie
    const { id } = req.params
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({
            message:'El id del la pelicula no es valido'
        })
    }
    try {
        movie = await Movies.findById(id)

        if (!movie) {
            return res.status(400).json({
                message:'La pelicula no fue encontrada'
            })
        }
        res.locals.movie = movie
        next()
    } catch (error) {
        return res.status(500).json({
            error:'Ups ocurrio un error!'
        })
    }  
}

export const allMovies = async(req:Request,res:Response) => {
    try {
        const movies = await Movies.find()
        if (movies.length === 0) {
            return res.status(204).json([])
        }
        res.json(movies)
    } catch (error) {
        res.status(500).json({error:'Ups hubo un error!'})   
    }
}

export const addMovie = async (req: Request, res: Response) => {
    const dataMovie = validateMovie(req.body)
    try {
        if (!dataMovie.success) {
            res.status(400).json({ error: dataMovie.error.errors[0].message });
            return;
        }
        const { title, year, director, duration, rate, poster, genre } = dataMovie.data
        
        const movie = new Movies({
            title,
            year,
            director,
            duration,
            rate,
            poster,
            genre
        })
        await movie.save()
        res.send({message:'Pelicula agregada correctamente'})
    } catch (error) {   
        res.status(500).json({error:'Ups a ocurrido un error!'})
    }
}

export const findIdMovie = async (req: Request, res: Response) => {
    res.json(res.locals.movie)
}

export const updateMovie = async (req: Request, res: Response) => {
    const {title,year,director,duration,rate,poster,genre} = req.body
    try {
        const movie = res.locals.movie
        movie.title = title || movie.title
        movie.year  = year || movie.year
        movie.director = director || movie.director
        movie.duration = duration || movie.duration
        movie.rate = rate || movie.rate
        movie.genre = genre || movie.genre
        await movie.save()
        res.json({message: `La pelicula ${movie.title} a sido actualizada correctamente`})
    } catch (error) {
        res.status(500).json({error:'Ups a ocurrido un error'})
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const movie = res.locals.movie
        await Movies.deleteOne({
            _id:movie._id
        })
        res.json({
            message: `La pelicula ${movie.title} fue eliminado correctamente`
        })
    } catch (error) {
        res.status(500).json({message:'Ups a ocurrido un error'})
    }
}


