const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        //verify token
        const decoded = jwt.verify(token, "secret");
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed in check auth',
            error
        });
    }
    
    
}