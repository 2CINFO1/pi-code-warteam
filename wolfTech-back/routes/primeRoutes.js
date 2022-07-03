var express = require('express');
var router = express.Router();
var Prime = require('../model/prime')
const auth = require("../middleware/auth");
router.get('/display', async(req, res) => {
    let prime = await Prime.find().populate('user');

    res.json(prime)
});


router.post('/add', async(req, res, next) => {



    let prime = await Prime.create({
        prime: req.body.prime,
        user: req.body.user
    });

    res.json(prime)
});



router.get('/delete/:_id', async(req, res) => {
    await Prime.findByIdAndDelete(req.params)
    res.json('delete success')

});

router.post('/update/:_id', async(req, res) => {
    let prime = await Prime.updateOne(req.params, req.body);
    res.json(prime)
})

module.exports = router