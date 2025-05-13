'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import postRoutes from '../src/post/post.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

const configs = (app)=>{
    app.use(express.json()) 
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/Posts', postRoutes)
    app.use('/v1/Comments', commentRoutes)
}

export const initServer = async()=>{
    const app = express() 
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}
