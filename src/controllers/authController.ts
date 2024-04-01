import { Request, Response } from "express";
import { validateUser} from '../schemas/user.schemas';

import { hashPassword } from "../services/password.sevice";
import User from "../models/user";
import { comparePasswords, generateToken } from "../services/auth.services";


export const register = async (req: Request, res: Response): Promise<void> => {
    const dataUser = validateUser(req.body)  

    try {
        if (!dataUser.success) {
            res.status(400).json({ error: dataUser.error.errors[0].message }) 
            return
        }
        
        const { email, password } = dataUser.data
        const hashedPassword = await hashPassword(password)

        const user = new User({
            email,
            password:hashedPassword
        }) 

        await user.save()

        const token = generateToken(user)
        res.status(201).json({ token })
        

    } catch (error: any) {

        if (error?.code === 11000 && error?.keyPattern?.email === 1) {
            res.status(400).json({ message: 'El gmail ingresado ya existe' })   
            return
        }
        res.status(500).json({error})
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const dataUser = validateUser(req.body)  

    try {
        if (!dataUser.success) {
            res.status(400).json({ error: dataUser.error.errors[0].message }) 
            return
        } 

        const { email, password } = dataUser.data
        const user = await User.findOne().where({email})
        
        if (!user) {
            res.status(404).json({ error: 'Error en el usuario y contrasena' })
            return
        }
        
        const passwordMatch = await comparePasswords(password, user.password!)  
        
        if (!passwordMatch) {
            res.status(401).json({ error: 'Usuario o contrasena no coinciden' })
            return
        }

        const token = generateToken(user)
        res.status(200).json({ token })
              
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error en el registro'
        })
    }
}