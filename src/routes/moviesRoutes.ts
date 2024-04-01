import express, { NextFunction, Request, Response } from 'express';
import { addMovie, allMovies, deleteMovie, findIdMovie, getMovie, updateMovie } from '../controllers/moviesController';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'
const moviesRouter = express.Router()

const authenticateToken = (req: Request, res: Response,next:NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({error:'No autorizado'})
    }
    jwt.verify(token, JWT_SECRET, (err,decoded) => {
        if (err) {
            return res.status(403).json({error:'No tiene autorizacion'})
        }
        next()
    })
}

//Crear un middelware que consulte a atra api otra base de datos y valide si tal cosa existe
//Para pode acceder a este recurso

moviesRouter.post('/',authenticateToken, addMovie)
moviesRouter.get('/', authenticateToken, allMovies)
moviesRouter.get('/:id',authenticateToken, getMovie, findIdMovie)
moviesRouter.put('/:id', authenticateToken, getMovie, updateMovie)
moviesRouter.delete('/:id', authenticateToken, getMovie, deleteMovie)

export default moviesRouter;