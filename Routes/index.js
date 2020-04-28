const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) =>{
    console.log(res.locals.auth_data);
    return res.send({message: 'Get com router separado'});
});

router.post('/', (req, res) =>{
    return res.send({message: 'post com router separado'});
});

module.exports = router;