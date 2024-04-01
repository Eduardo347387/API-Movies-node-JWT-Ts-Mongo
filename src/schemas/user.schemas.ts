import {z} from 'zod'

export const user = z.object({
    email: z.string({
        invalid_type_error: 'el gmail es de tipo string',
        required_error:'El gmail es requerido'
    }).email(),
    password: z.string({
        invalid_type_error: 'el password es de tipo string',
        required_error:'el password es requerido'
    })
})



export type userType = z.infer<typeof user>

export function validateUser(object:userType){
    return user.safeParse(object)
}