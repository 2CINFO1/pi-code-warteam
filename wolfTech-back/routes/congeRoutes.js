var express = require('express');
var router = express.Router();
var Conge = require('../model/conge');

router.get('/display', async(req, res) => {
    let conges = await Conge.find();

    res.json(conges)
});



router.post('/add', async(req, res, next) => {
    let conge = await Conge.create(req.body);
    console.log(conge);
    res.json(conge)
});
router.get('/delete/:_id', async(req, res) => {
    await Conge.findByIdAndDelete(req.params)
    res.json('delete success')

});
router.get('/update/:_id', async(req, res) => {
    let conge = await Conge.findById(req.params);
    console.log(prime);
    res.json(conge)
})

router.post('/update/:_id', async(req, res) => {
    let conge = await Conge.updateOne(req.params, req.body);
    res.json(conge)
})

module.exports = router