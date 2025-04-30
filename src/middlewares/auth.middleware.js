import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

export const userAuth = (req,res,next)=>{
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if(!token){
            return res.status(401).json({
                message: "Unauthorized. No token provided.",
                status: 401,
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                message: "Unauthorized. Invalid token.",
                status: 401,
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Unauthorized",
            status: 401,
        });
    }
}