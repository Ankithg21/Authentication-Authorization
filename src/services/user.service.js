import User from "../models/users.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const register = async ({name, email, password})=>{
    if(!name ||!email || !password){
        throw new Error("Name, email and password are required.");
    }
    const user = await User.findOne({email});
    if(user){
        throw new Error("User already exists.");
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_ROUNDS));
    const newUser =await User.create({
        name,
        email,
        password: hashedPassword,
    });
    return newUser;
};
