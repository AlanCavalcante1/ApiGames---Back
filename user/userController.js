const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

router.get('/users', (req,res)=>{
    User.findAll().then(users=>{
        res.status(200).json({users:users});
    }).catch(error=>{
        console.log(error)
    })
})

router.post('/user/create',(req,res)=>{
    const {email, name, password} = req.body;
    User.findOne({
        where:{email}
    }).then(user=>{
        if(user == undefined){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            User.create({
                name,
                email,
                password: hash
            }).then(()=>{
                res.status(201).json({message: "criado com sucesso"});
            }).catch(err=>{
                console.log(error=>{
                    console.log(error);
                })
            })
        }else{
            res.json({message:"User com email ja cadastrado"})
        }
    })
})

module.exports = router;