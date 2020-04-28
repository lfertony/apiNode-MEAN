const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const createUsertoken = (userId)=>{
    return jwt.sign({id: userId}, config.auth_pwd, {expiresIn: config.token_exp});
}
router.get('/', async (req, res) =>{
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch(err){
        return res.status(404).send({error: 'User can not be found'});
    }
});

//Crisando rota de criacao de user
router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).send({error: 'E-mail or Password cant be found'});
    }

    try{
        if(await Users.findOne({email})) return res.status(400).send({error: 'this user already exists'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({user, token: createUsertoken(user.id)});

    }catch(err){
        return res.status(500).send({error: 'something wrong about this user'});
    }

});

router.post('/auth', async (req, res) =>{
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send({error: 'E-mail or Password cant be found'});
    try{
        const user = await Users.findOne({email}).select('+password');
        if(!user) return res.status(404).send({error: 'user dont exists'});

        const pass_ok = await bcrypt.compare(password, user.password);
        if(!pass_ok) return res.status(403).send({error: 'User can not be checked'});

        user.password = undefined;
        return res.send({user, token: createUsertoken(user.id)});

    }catch(err){
        return res.status(500).send({error: 'something wrong about this user'});
    }      
})
   


module.exports = router;