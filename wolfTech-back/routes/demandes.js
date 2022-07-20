var express = require('express');
var router = express.Router();
const Demande = require('../model/demande')
const auth = require("../middleware/auth");
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Projet = require('../model/Projet')

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
            file: req.file.filename,
            user: req.user.user_id,
            status: 'progress'
        }
        demande = await Demande.create(demande)
        res.status(200).json(demande);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

router.get('/', async (req, res) => {
    try {
        let demandes = await Demande.find()
        res.status(200).json(demandes);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

router.get('/one/:_id', async (req, res) => {
    try {
      let demande = await Demande.findOne(req.params)
      res.status(200).json(demande)
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

router.post('/update/:_id', auth, async (req, res) => {
    try {
        let demande = await Demande.findByIdAndUpdate(req.params, req.body);
        res.status(200).json(demande);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

router.post('/actions/:_id', async (req, res) => {
    try {
        let demande = await Demande.findById(req.params)
        demande.status = req.body.status
        demande.save()
        if (demande.status == 'accepted') {
            let projetData = {
                Nom: demande.title,
                Description: demande.description,
                file: demande.file,
                Etat: 'progress'
            }
            let projet = await Projet.create(projetData)
        }
        res.status(200).json(demande);
    } catch (error) {
        res.status(400).json(error.mecoursssage);   
    }
})

router.get('/stats', async (req, res) => {
    try {
        let data = {
            'demande' : {
                'progress': await Demande.find({/*user: req.user.user_id,*/ status: 'progress'}).count(), 
                'accepted': await Demande.find({/*user: req.user.user_id,*/ status: 'accepted'}).count(),
                'rejected': await Demande.find({/*user: req.user.user_id,*/ status: 'rejected'}).count()
            }
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router;
