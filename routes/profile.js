require('dotenv/config')
const express = require("express");
const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator");
const router = express.Router()
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
const saltRounds = 10;
const  Users = require("../models/Users");
const connectToMongo = require('../db');

connectToMongo()

const redirectAuth = (req, res, next) => {
    if (req["x-email"]) {
        res.status(307).end();
    } else {
        next();
    }
}

router.post("/profile", redirectAuth,
    body("fullname", "Enter your Fullname").notEmpty(),
    body("sugarlevel", "Enter your sugarlevel in mg/dL").isNumeric(),
    body("bloodpressure", "Enter your bloodpressure in mmHg").notEmpty(),
    body("cholestrol", "Enter your cholestrol in mg/dL").isNumeric(),
    body("weightInkg", "Enter your weight in kg").isNumeric(),
    body("height", "Enter your height in cm").isNumeric(),
    body("physique", "How is your physique").notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ msg: "Please Login..." });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({ msg: "Please Login..." });
            }

            const findUser = await Users.findById(decoded.userId);
            if (!findUser) {
                return res.status(404).json({ msg: "User not found" });
            }

            findUser.fullname = fullname;
            findUser.sugarlevel = sugarlevel;
            findUser.cholestrol = cholestrol;
            findUser.bloodpressure = bloodpressure;
            findUser.weightInkg = weightInkg;
            findUser.height = height;
            findUser.physique = physique;

            await findUser.save();

            return res.status(200).json({ msg: "Profile updated successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }
);

module.exports = router;
