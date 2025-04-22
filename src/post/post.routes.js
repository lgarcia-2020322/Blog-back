import { Router } from 'express'
import {
    agregarComentario,
    obtenerComentariosPorPost,
} from './comment.controller.js'

const api = Router()

api.post('/Add', agregarComentario)
api.get('/Post/:postId', obtenerComentariosPorPost)

export default api
