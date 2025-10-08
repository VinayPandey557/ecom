import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import prisma from "../config/prismaClient.js";
dotenv.config();




const JWT_SECRET = process.env.JWT_SECRET;
console.log("This is from middleware jwt", JWT_SECRET);




export const authMiddleware = async (req, res, next) =>  {

    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({
                message: "Access denied, No token provided"
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);


        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });
        if(!user) {
            return res.status(401).json({ error: "User not found"})
        }

        req.user = user;
        next();
        } catch(error) {
         console.error("Auth middleware error:", error);


         if (error.name === 'JsonWebTokenError') {
         return res.status(401).json({ error: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
         return res.status(401).json({ error: 'Token expired' });
        } else {
          return res.status(500).json({ error: 'Authentication error' });
        }
    }

}