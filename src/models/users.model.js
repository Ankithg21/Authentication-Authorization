import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.hashPassword = async function (password){
    const rounds = parseInt(process.env.HASH_ROUNDS);
    return await bcrypt.hash(password, rounds);
};

userSchema.methods.isValidPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function(){
    return jwt.sign({email: this.email}, process.env.JWT_SECRET, {expiresIn: "24h"});
}

const User = mongoose.model("User", userSchema);

export default User;