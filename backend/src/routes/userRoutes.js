import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import prisma from "../config/prismaClient.js"
dotenv.config();


const router = express.Router();

const JWT_SECRET= process.env.JWT_SECRET || "mysecret";4




router.get("/", (req, res) => {
    res.send("User routes working");
})

router.post("/signup", async(req, res) => {
        const {name , email, password }= req.body;
        if(!email || !password || !name ) {
            return res.status(400).json({ error: "All fields must be filled"});
        }
        try {
            const existingUser = await prisma.user.findUnique({ where: { email }});
            if(existingUser) return res.status(400).json({error: "Email already exists"});


            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await prisma.user.create({
                data: { name, email, password: hashedPassword }
            });

            const token = jwt.sign(
                { id: user.id, email: user.email }, 
                JWT_SECRET, 
                { expiresIn: "1h" } 
            );
            res.status(201).json({ 
                message: "User created successfully",
                user,
                token
                });
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: "Server error"});
        }
    
   })

       router.post("/signin", async (req, res) => {
            const { email, password } = req.body;
            if(!email || !password ) {
                return res.status(400).json({ error: "All fields are required"});
            }

            try {
              const existingUser = await prisma.user.findUnique({ where: { email }});
              if(!existingUser) return res.status(400).json({error: "Invalid credentials"});

              const isMatch = await bcrypt.compare(password, existingUser.password);
              if(!isMatch) return res.status(400).json({ error: "Invalid password"});
                            
              const token = jwt.sign({
                id: existingUser.id, email: existingUser.email
              }, { expiresIn: "1h"})
               

              res.json({
                message: "Signin successfull",
                user: { id: user.id, email: user.email},
                token
              })

            } catch(error) {
                console.error(error);
                res.status(500).json({ error: "Server error "});
            }
    })



export default router;