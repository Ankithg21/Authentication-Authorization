import { Router } from "express";
import { loginUser, registerUser, userProfile } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { userAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", 
    body("name").notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Email is required."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    registerUser
);

router.post("/login",
    body("email").isEmail().withMessage("Email is required."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    loginUser
);

router.get("/profile",
    userAuth,
    userProfile
);

export default router;