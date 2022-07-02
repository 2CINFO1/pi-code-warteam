var express = require('express');
var router = express.Router();
const Demande = require('../model/demande')
const auth = require("../middleware/auth");
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname+'/projets/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

const upload = multer({ storage });

router.post('/create', auth, upload.single('file'), async (req, res) => {
    try {
        let { title, description } = req.body;
        let demande = {
            title,
            description,
            file: req.file.filename
        }
        demande = await Demande.create(demande)
        res.status(200).json(demande);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

router.get('/', auth, async (req, res) => {
    try {
        let demandes = await Demande.find()
        res.status(200).json(demandes);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

router.post('/delete/:_id', auth, async (req, res) => {
    try {
        let demande = await Demande.findByIdAndDelete(req.params)
        res.status(200).json('Delete with success');
    } catch (error) {
        res.status(400).json(error.message);
    }
})

router.post('/update/:_id', async (req, res) => {
    try {
        let demande = await Demande.findByIdAndUpdate(req.params, req.body);
        res.status(200).json(demande);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

module.exports = router;
