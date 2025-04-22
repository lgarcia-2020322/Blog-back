import { Router } from 'express'
import {
    crearPublicacion,
    obtenerPublicaciones,
    obtenerPublicacion,
    actualizarPublicacion,

} from './post.controller.js'

const api = Router()

api.post('/Add', crearPublicacion)
api.get('/All', obtenerPublicaciones)
api.get('/One/:id', obtenerPublicacion)
api.put('/Update/:id', actualizarPublicacion)


export default api
