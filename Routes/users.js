const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) =>{
    Users.find({}, (err, data) =>{
        if(err) return res.send({error: 'Error on Users Get Query'});
        return res.send(data);
        })
});

//Crisando rota de criacao de user
router.post('/create', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.send({error: 'E-mail or Password cant be found'});
    }

    Users.findOne({email}, (err, data) =>{
        if(err) return res.send({error: 'something wrong about this user'});
        if(data) return res.send({error: 'this user already exists'});

        Users.create(req.body, (err, data) =>{
            if(err) return res.send({error: 'user can not be created'});
            data.password = undefined;
            return res.send(data);
        })
    })
});

router.post('/auth', (req, res) =>{
    const { email, password } = req.body;

    if(!email || !password) return res.send({error: 'E-mail or Password cant be found'});

    Users.findOne({email}, (err, data) => {
        if(err) return res.send({error: 'something wrong about this user'});
        if(!data) return res.send({error: 'user dont exists'});

        bcrypt.compare(password, data.password, (err, same) =>{
            if(!same) return res.send({error: 'User can not be checked'});
            data.password = undefined;
            return res.send(data);
        })
    }).select('+password');
})

module.exports = router;