const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./db/database');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const JWTSecret = "ckmfkqwmkdnqwdkrfnkfwmkemkemsabnshmskwheutpuddnapqurvxealapqlvvbzdsktfrot"

app.use(cors());

const gameController = require('./games/gameController');
const Game = require('./games/Game');

const userController = require('./user/userController');
const User = require('./user/User');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//DateBase
connection
    .authenticate()
    .then(()=>{
        console.log("Conectado ao BD....")
    })
    .catch(error => {
        console.log(error)
    })

//Routes
app.use('/',gameController);
app.use('/', userController);

app.get('/',(req,res)=>{
    res.json("Ola")
})

app.post('/auth',(req,res)=>{
    const {email, password} = req.body;
    if(email != undefined){
        User.findOne({where:{email}}).then(user=>{
            if(user!=undefined){
                const correct = bcrypt.compareSync(password, user.password);
                if(correct){
                    jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn: '1h'},(error, token)=>{
                        if(error){
                            res.status(400).json({message:"Falha Interna"})
                        }else{
                            res.status(200).json({user, token: token});
                        }
                    }) //PAYLOAD (Infos q estao dentro do token)
    
                }else{
                    
                    res.staus(401).json({message:"Senha Invalida"})
                }
            }else{
                res.status(404).json({message:"User nao encontrado"})
            }
        })
    }else{
        res.status(400).json({message: 'Email invalido'});
    }
})

app.listen(3000,()=>{
    console.log('Servidor ligado')
})