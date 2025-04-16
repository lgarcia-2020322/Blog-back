'use strict' // NO NECESARIO

import jwt from 'jsonwebtoken'

export const validateJwt = async(req, res, next)=>{
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send(
            {
                succses: false,
                message: 'Unauthorized'
            }
        )
        let user = jwt.verify(authorization, secretKey)
        const validateUser = await findUser(user.uid)
        if(!validateUser) return res.status(404).send(
            {
                succses: false,
                message:'user not found | Unauthorized'
            }
        )
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send(
            {
                succses: false,
                message: 'Invalid token or expired'
            }
        )
    }
}
