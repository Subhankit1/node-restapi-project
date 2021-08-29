const Admin = require('../models/admin');
const mongoose = require("mongoose");
//import bcrypt for encrypted password
const bcrypt = require("bcrypt");
//import jwt
const jwt = require("jsonwebtoken");




// signup
exports.create_admin = (req,res) => {
    //check email is exiest or not
    Admin.find({email: req.body.email})
    .exec()
    .then(admin => {
        if(admin.length >= 1){                   
            return res.status(409).json({
                message: 'Email is already exist'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    //create new user
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    //save the new user data
                    admin
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            })
        }
    }) 
   
}


//login
exports.login_admin = (req,res) => {
    //check email is exist or not
    Admin.find({email: req.body.email})
    .exec()
    .then(admin => {
        if(admin.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        //check password
        bcrypt.compare(req.body.password, admin[0].password, (err,result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result){
                //use jwt method for token based authentication
                const token = jwt.sign(
                {
                    email: admin[0].email,
                    userId: admin[0]._id,
                    role: admin[0].role
                }, "secretkey",
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            }
            return res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

//delete
/*
exports.delete_user =  (req,res) => {
    User.findByIdAndDelete({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User Deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}
*/