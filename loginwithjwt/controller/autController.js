const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//get all users
router.get('/users',(req,res) => {
    User.find({},(err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//Register User
router.post('/register',(req,res) => {
    User.findOne({email:req.body.email}, (err,user) => {
        if(err) return res.send({auth:false,token:'Error While Login'})
        if(user) return res.send({auth:false,token:'Email Already Taken'})
        else{
           //encrypt password
            let hashPassword = bcrypt.hashSync(req.body.password,8);
            User.create({
                name:req.body.name,
                email:req.body.email,
                password:hashPassword,
                phone:req.body.phone,
                role:req.body.role?req.body.role:'User'
            },(err,data) => {
                if(err) return res.send('Error While register');
                res.send('Register Succesful')
            }) 
        }
    })
})

//login User
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email}, (err,user) => {
        if(err) return res.send({auth:false,token:'Error While Login'})
        if(!user) return res.send({auth:false,token:'No User Found Regiter First'})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(!passIsValid) return res.send({auth:false,token:'Invalid Password'})
            // in case both password and email match than generate token
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400});
            res.send({auth:true,token:token})
        }
    })
})

//get User Info
router.get('/userInfo',(req,res) => {
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'})
    // jwt verify token
    jwt.verify(token,config.secret,(err,user) => {
        if(err) res.send({auth:false,token:'Invalid Token Provided'})
        User.findById(user.id,(err,result) => {
            res.send(result)
        })

    })
})


module.exports = router
