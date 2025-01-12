import jwt from 'jsonwebtoken';

export const generateToken = (userId , res ) => {


    const token = jwt.sign({userId} , process.env.JWT_SECRET ,  {
        expiresIn: '7d'
    });
    res.cookie('token' , token , {
        expiresIn: new Date(Date.now() + 604800000),
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production' ? true : false
    }); 
    return token;
    } 
