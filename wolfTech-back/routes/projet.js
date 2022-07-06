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

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname + '/uploads/'));
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
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
            file: req.file.path

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




router.get('/archive/:_id', async (req, res, next) => {
    let projet = await Projet.findByIdAndUpdate(req.params, {isArchive : true})
    res.json({ success: true, msg: 'projet archived' , projet : projet });
})



module.exports = router;