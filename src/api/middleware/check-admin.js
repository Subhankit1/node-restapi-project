const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secretkey");
        /*
        req.userData = decoded;
        if (req.userData.role!="Admin") {
          res.send(error)
        }
        */
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'You have not authorized to do this operation'
        });
    }
};