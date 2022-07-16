var express = require('express');
var router = express.Router();
const Review = require('../model/review')
const auth = require("../middleware/auth");

router.post('/create', auth, async (req, res) => {
    try {
        let userData = {
            ...req.body,
            user: req.user.user_id
        }
        userData = await Review.create(userData);
        res.status(200).json(userData);
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post('/delete/:_id', auth, async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params)
        res.status(200).json('Deleted with success');
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await Review.find().populate(['user', 'projet']))
    } catch (error) {
        res.status(400).json(error.message) 
    }
})

router.get('/projet/:projet', auth, async (req, res) => {
    try {
        res.status(200).json(await Review.find(req.params).populate(['user', 'projet']))
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/top')

module.exports = router;
