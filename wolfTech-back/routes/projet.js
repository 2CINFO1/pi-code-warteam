var express = require('express');
var router = express.Router();
var Projet = require('../model/Projet');
var multer = require('multer');
var path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator'); const { Router } = require('express');
const app = express();
app.use(bodyParser.json());
router.get('/', function (req, res) {
    Projet.find((err, data) => {

        if (err) throw err;
        res.json(data);
    });

});
router.delete('/delete/:_id', async (req, res) => {
    console.log(req.params);
    await Projet.findByIdAndDelete(req.params)
    res.json('delete success')



});

router.post('/update/:_id', async (req, res) => {
    let projet = await Projet.findById(req.params);
    projet.Description = req.body.Description,
    projet.Nom = req.body.Description
    projet.save()
    res.json(projet)
})


router.get('/afficher', async (req, res) => {
    let query = {
        isArchive: false
    }
    let projet = await Projet.find(query).populate({
        path: 'Taches',
        populate: {
            path: 'User'
        }
    });

    res.json(projet)
});
router.get('/affichertout', async (req, res) => {
   
    let projet = await Projet.find().populate({
        path: 'Taches',
        populate: {
            path: 'User'
        }
    });

    res.json(projet)
});
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname + '/uploads/'));
    },
    filename: function (req, file, callback) {
        callback(null, Date.now()+'-'+file.originalname);
    }
});
let upload = multer({ storage });

router.post('/add',

    upload.single('file'), function (req, res) {


        var P = new Projet({
            Nom: req.body.Nom,
            Description: req.body.Description,
            Date_Debut: req.body.Date_Debut,
            Date_Fin: req.body.Date_Fin,
            Etat: req.body.Etat,
            file: req.file.filename

        });

        P.save();
        res.json(P)
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });

router.get('/one/:_id', async (req, res) => {
    try {
        let projet = await Projet.findOne(req.params).populate({
            path: 'Taches',
            populate: {
                path: 'User'
            }
        })
       res.json(projet)
    } catch (error) {
        res.json(error.message)
    }
})


router.get('/archive/:_id', async (req, res, next) => {
    let projet = await Projet.findByIdAndUpdate(req.params, {isArchive : true})
    res.json({ success: true, msg: 'projet archived' , projet : projet });
})

router.get('/Desarchive/:_id', async (req, res, next) => {
    let projet = await Projet.findByIdAndUpdate(req.params, {isArchive : flase})
    res.json({ success: flase, msg: 'projet desarchived' , projet : projet });
})

router.post('/action/:_id', async (req, res) => {
    try {
        let _project = await Projet.findByIdAndUpdate(req.params, req.body);
        res.status(200).json(_project)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/stats', async (req, res) => {
    try {
        let data = {
                'projects': await Projet.find().count(),
                'pending': await Projet.find({Etat: 'pending'}).count(), 
                'progress': await Projet.find({Etat: 'progress'}).count(),
                'enclosed': await Projet.find({Etat: 'enclosed'}).count()
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router;