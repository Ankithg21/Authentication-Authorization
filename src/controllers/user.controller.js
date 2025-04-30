import * as userServices from "../services/user.service.js";
import User from "../models/users.model.js";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

export const registerUser = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: errors.array(),
            status: 400,
        });
    }
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
        return res.status(400).json({
            message: "Name, email and password are required.",
            status: 400,
            });
        }
        const newUser = await userServices.register({name, email, password});
        const token = newUser.generateJWT();
        res.status(201).json({
            message: "User registered successfully.",
            status: 201,
            data: {
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
                token,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            status: 500,
        });
    }
};

export const loginUser = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: errors.array(),
            status: 400,
        });
    }
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required.",
                status: 400,
            });
        }
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({
                message: "User not found.",
                status: 404,
            });
        }
        const isValid = await existingUser.isValidPassword(password);
        if(!isValid){
            return res.status(401).json({
                message: "Invalid password.",
                status: 401,
            });
        }
        const token = existingUser.generateJWT();
        res.status(200).json({
            message: "User logged in successfully.",
            status: 200,
            data: {
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                },
                token,
            },
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message,
            status: 500,
        });
    }
}

export const userProfile = async (req,res)=>{
    console.log(req.user);
    return res.status(200).json({
        message: "User profile fetched successfully.",
        status: 200,
        data: {
            user: {
                email: req.user.email,
            },
        },
    });
};



























