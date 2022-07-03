var express = require('express');
var router = express.Router();
var Conge = require('../model/conge');
const auth = require("../middleware/auth");

router.get('/display', async(req, res) => {
    let conges = await Conge.find().populate('user');

    res.json(conges)
});



router.post('/add', auth, async(req, res, next) => {
    let conge = await Conge.create({
        ...req.body,
        user: req.user.user_id
    });

    res.json(conge)
});
router.get('/delete/:_id', async(req, res) => {
    await Conge.findByIdAndDelete(req.params)
    res.json('delete success')

});

router.post('/update/:_id', async(req, res) => {
    let conge = await Conge.updateOne(req.params, req.body);
    res.json(conge)
})

module.exports = router