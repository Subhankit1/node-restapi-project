const express = require("express");
const router = express.Router();



//import controller
const AdminController = require('../controller/admin');



router.post('/signup', AdminController.create_admin);


router.post('/login', AdminController.login_admin);




module.exports = router;