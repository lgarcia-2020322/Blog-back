import { Router } from 'express'
import {
    addComment,
    getCommentsByPost,
    disableComment
} from './comment.controller.js'

const api = Router()

api.post('/Add', addComment)

api.get('/Post/:postId', getCommentsByPost)

api.delete('/Delete/:id', disableComment)

export default api
