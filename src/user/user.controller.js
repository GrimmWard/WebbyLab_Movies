import express from "express";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'


const router = express.Router();
// console.log(process.env.JWT_SECRET)



router.post('/create', async (req, res) => {
    await User.create(req.body)
    res.send('User Created!');
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email: email}});

    if (!user || user.password !== password) {
        return res.status(401).json({error: 'Invalid email or password'});
    }

    // console.log(process.env.JWT_SECRET)

    const token = jwt.sign(
        {id: user.id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    res.json({token});
});


export default router;