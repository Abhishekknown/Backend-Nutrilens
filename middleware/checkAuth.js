const jwt = require('jsonwebtoken');
const connectToMongo = require('../db');
const JWT_SECRET = process.env.JWT_SECRET
connectToMongo()


const checkAuth = async (req, res, next) => {
    const token = req.header("authorization");
    if (token) {
        try {
            const decryptToken = jwt.verify(token, JWT_SECRET)
            const userData = await Users.findById(decryptToken)
            if (decryptToken.hash === userData.password) {
                req["x-email"] = userData.email;
                req["x-userId"] = decryptToken;
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    next()
}
module.exports = checkAuth;
