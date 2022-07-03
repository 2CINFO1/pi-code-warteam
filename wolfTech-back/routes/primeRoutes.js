var express = require('express');
var router = express.Router();
var Conge = require('../model/prime')

router.get('/afficher', async(req, res) => {
    let prime = await Prime.find();

    res.json(prime)
});

router.post('/ajouter', async(req, res, next) => {
    let prime = await Prime.create(req.body);
    console.log(prime);
    res.json(prime)
});
router.get('/delete/:_id', async(req, res) => {
    await Prime.findByIdAndDelete(req.params)
    res.json('delete success')

});
router.get('/update/:_id', async(req, res) => {
    let prime = await Prime.findById(req.params);
    console.log(prime);
    res.json(prime)
})

router.post('/update/:_id', async(req, res) => {
    let prime = await Prime.updateOne(req.params, req.body);
    res.json(prime)
})

module.exports = router