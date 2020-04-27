const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    return res.send({message: 'Get com router separado'});
});

router.post('/', (req, res) =>{
    return res.send({message: 'post com router separado'});
});

module.exports = router;