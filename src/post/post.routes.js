import { Router } from 'express'
import {
    addPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} from './post.controller.js'

const api = Router()

api.post(
    '/Add', 
    addPost
)

api.get(
    '/All', 
    getAllPosts
)

api.get(
    '/One/:id', 
    getPostById
)

api.put(
    '/Update/:id', 
    updatePost
)

api.delete(
    '/Delete/:id',
    deletePost
)


export default api
