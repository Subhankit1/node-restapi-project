const User = require('../models/user');
const mongoose = require("mongoose");
//import bcrypt for encrypted password
const bcrypt = require("bcrypt");
//import jwt
const jwt = require("jsonwebtoken");



// signup
exports.create_user = (req,res) => {
    //check email is exiest or not
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){                   
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
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    //save the new user data
                    user
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
exports.login_user = (req,res) => {
    //check email is exist or not
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        //check password
        bcrypt.compare(req.body.password, user[0].password, (err,result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result){
                //use jwt method for token based authentication
                const token = jwt.sign(
                {
                    email: user[0].email,
                    userId: user[0]._id
                }, "secret",
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