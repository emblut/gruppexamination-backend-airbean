import { Router } from "express";
import User from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import validateAuthBody from "../middlewares/validateAuthBody.js";

const router = Router();

router.post('/login', async (req, res) =>{
    const { username, password} = req.body;

    try{
        const user = await User.findOne({ username });

        if(!user || user.password !== password){
            return res.status(401).json({
                success: false,
                message: 'Wrong username or password'
            })
        }

        global.user = user;

        res.json({
            success: true,
            message: 'Inlog was a success',
            user:{
                userId: user.userId,
                username: user.username
            }
        })
    }catch(error){
        console.log('Login error:', error);
        res.status(500).json({
            success: false,
            message : "Servererror when logging in"
        })
    }
})

router.post('/register', validateAuthBody, async (req, res) =>{
    const { username, password } = req.body;

    const shortUuid = uuidv4().split('-')[0];
    const userId = `user-${shortUuid}`;

    try{
        const newUser = new User({
            username,
            password,
            userId  
        })

        await newUser.save()

        res.status(201).json({
            success: true,
            message: "Register was an success, user is made!",
            user: {
                username,
                userId
            }
        });

    }catch(error){
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: "Could not register the new user"
        })
    }
})

export default router;