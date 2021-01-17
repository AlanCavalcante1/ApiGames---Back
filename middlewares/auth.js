const Secret = require('../index');
const jwt = require('jsonwebtoken');
const Secret1 = "ckmfkqwmkdnqwdkrfnkfwmkemkemsabnshmskwheutpuddnapqurvxealapqlvvbzdsktfrot";

function auth(req,res, next){
    const authToken = req.headers["authorization"];
    if(authToken != undefined){
        jwt.verify(authToken, Secret1, (error, data)=>{
            if (error){
                res.status(401).json({message:"Token Invalido"})
            }else{
                req.token = authToken;
                req.loggedUser = {id: data.id, email: data.email} 
                next();
            }
        })

    }else{
        res.status(401).json({message:"Token Invalido"})
    }
}

module.exports = auth;