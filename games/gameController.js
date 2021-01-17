const express = require('express');
const router = express.Router();
const Game = require('./Game');
const auth = require('../middlewares/auth');

router.get('/games', auth,(req,res)=>{
    Game.findAll().then(games=>{
        return res.status(200).json({user: req.loggedUser, games: games});
    }).catch(error =>{
        console.log(error)
    })
})

router.get('/games/:id',(req,res)=>{
    const id = req.params.id;
    if(isNaN(id)){
        return res.status(400);
    }
    Game.findByPk(id).then(game =>{
        if(game != undefined){
            return res.status(200).json({game: game});
        }else{
            return res.sendStatus(404);
        }
    })
})

router.post('/game',(req,res)=>{
    // const {game} = req.body;
    // const title = game.title;
    // const year = game.year;
    // const price = game.price
    const {title, price, year} = req.body;
    Game.create({
        title,
        year,
        price
    }).then(()=>{
        res.sendStatus(201);
        res.json({ message: 'Criado com sucesso'});
    })

})

router.delete('/game/:id',(req,res)=>{
    const id = req.params.id;
    if(!isNaN(id)){
        Game.destroy({
            where:{id}
        }).then(()=>{
            res.sendStatus(200);
        }).catch(error=>{
            console.log(error);
        })
    }else{
        res.status(400);
        res.json({ message: 'Você não digitou um Id valido'});
    }
})

router.put('/game/:id',(req,res)=>{
    const id = req.params.id;
    if(!isNaN(id)){
        const {title, price, year} = req.body;
        if(title != undefined){
            Game.update({title}, {where:{id}})
        }
        if(price != undefined){
            Game.update({price}, {where:{id}})
        }
        if(year != undefined){
            Game.update({year}, {where:{id}});
        }
        
        res.sendStatus(200);

    }else{
        res.status(400);
        res.json({ message: 'Você não digitou um Id valido'}); 
    }
})

module.exports = router;