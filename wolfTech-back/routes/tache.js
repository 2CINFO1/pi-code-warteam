var express = require('express');
var router = express.Router();
var Tache = require('../model/Tache');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


router.get('/', function (req, res) {
    Tache.find((err, data) => {

        if (err) throw err;
        res.json(data);
    });

});
router.get('/afficher', async(req, res) => {
    let tache = await Tache.find();

    res.json(tache)
});
router.post('/update/:_id', async(req, res) => {
    let tache = await Tache.findById(req.params);
    tache.Description = req.body.Description
    tache.save()
    res.json(tache)
})
router.get('/delete/:_id', async(req, res) => {
    console.log(req.params);
    await Tache.findByIdAndDelete(req.params)
    res.json('delete success')


    
});

router.post('/add', function (req, res) {
    console.log(req.body);
    var T = new Tache({
        Nom: req.body.Nom,
        Description: req.body.Description,
        Date_Debut: req.body.Date_Debut,
        Date_Fin: req.body.Date_Fin,
        Etat: req.body.Etat,
        Projet : req.body.Projet
        
    });
    T.save();
    res.json(T)
});

module.exports = router;