import { z } from "zod";

export const movie = z.object({
    title: z.string({
        invalid_type_error: 'Title es de tipo String',
        required_error: 'Title requerido'
    }).min(3, { message: 'Requiere un minimo de 3 carateres' }),
    
    year: z.number({
        invalid_type_error:'Year es de tipo Number',
        required_error:'campo Year requerido'
    }).int().positive().min(1895, { message: 'Fecha invalida' }).max(new Date().getFullYear(), { message: 'Fecha invalida' }),
    
    director: z.string({
        invalid_type_error:'Director es de tipo String',
        required_error:'campo director requerido'
    }),

    duration: z.number({
        invalid_type_error: 'duracion es de tipo Number',
        required_error:'Campo duracion requerido'
    }).int().positive(),

    rate: z.number({
         invalid_type_error: 'rate es de tipo Number',
        required_error: 'campo rate requerido'
    }).min(0).max(10).positive(),

    poster: z.string({
        invalid_type_error: 'poster es de tipo String',
        required_error: 'campo poster requerido'
    }).url(),

    genre: z.string({
        invalid_type_error: 'genero es de tipo String',
        required_error: 'campo genero requerido'
    })
})

export type movieType = z.infer<typeof movie>

export function validateMovie(object: movieType) {
    return movie.safeParse(object)
}