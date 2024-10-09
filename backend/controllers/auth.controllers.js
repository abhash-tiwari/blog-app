import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
export const registerUser = async(req,res) =>{
    
    try{
        const {username,email,password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: "User already Exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        await newUser.save();

        res.status(200).json({message: "User Created Successfully", user: newUser})
    }catch(error){
        console.log(error);
        res
          .status(500)
          .json({ message: "Registration Failed!", error: error.message });
    }
}
export const loginUser = async(req,res) =>{
    try{
            const {email,password} = req.body;

            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: "User doesn't Exist!"})
            }

            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).json({message: "Invalid Credentials!"})
            }

            const token = jwt.sign({id: user._id},process.env.JWT_TOKEN)
            res.status(200).json({token,user,message: "Login Successfully!"})


    }catch(error){
        console.log(error);
        res.status(500).json({message: "Login Failed",error: error.message})
    }
}