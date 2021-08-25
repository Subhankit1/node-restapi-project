const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


//import controller
const UserController = require('../controller/user');



router.post('/signup', UserController.create_user);


router.post('/login', UserController.login_user);



router.delete('/:userId',checkAuth, UserController.delete_user);


module.exports = router;