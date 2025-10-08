import prisma from "../config/prismaClient.js"


// create category 

export const createCategory = async(req , res) => {
    const { name } = req.body;
    if(!name) return res.status(400).json({ error: "Name is required"});


    try {
        const category = await prisma.category.create({ data: { name }});
        res.status(201).json(category);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Server error"});
    }
}


// Get all category


export const getCategories = async(req, res) => {
     try {
        const categories = await prisma.category.findMany({
            include: { products: true },
        })
        res.json(categories);
     } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Server error"});
     }
}

