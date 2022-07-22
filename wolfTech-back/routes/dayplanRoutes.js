var express = require('express');
var router = express.Router();
var DayPlan = require('../model/dayplan');

router.get('/display', async(req, res) => {
    let dayplan = await DayPlan.find();

    res.json(dayplan)
});



router.post('/add', async(req, res, next) => {
    let dayplan = await DayPlan.up
    console.log(dayplane);
    res.json(dayplan)
});
router.get('/delete/:_id', async(req, res) => {
    await DayPlan.findByIdAndDelete(req.params)
    res.json('delete success')

});
router.get('/update/:_id', async(req, res) => {
    let conge = await DayPlan.findById(req.params);
    console.log(prime);
    res.json(dayplan)
})

router.post('/update/:_id', async(req, res) => {
    let conge = await DayPlan.updateOne(req.params, req.body);
    res.json(conge)
})

module.exports = router