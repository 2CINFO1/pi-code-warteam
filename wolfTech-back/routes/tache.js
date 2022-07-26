var express = require('express');
var router = express.Router();
var Tache = require('../model/Tache');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Projet = require('../model/Projet')

router.get('/', function (req, res) {
    Tache.find((err, data) => {

        if (err) throw err;
        res.json(data);
    });

});
router.get('/afficher', async (req, res) => {
    let tache = await Tache.find();

    res.json(tache)
});
router.post('/update/:_id', async (req, res) => {
    let tache = await Tache.findById(req.params);
    tache.Description = req.body.Description
    tache.save()
    res.json(tache)
})
router.post('/delete/:_id', async (req, res) => {
    console.log(req.params);
    await Tache.findByIdAndDelete(req.params)
    res.json('delete success')



});

router.post('/add', async (req, res) => {
    try {
        let projet = await Projet.findById(req.body.Projet)
        let T = await Tache.create({
            Nom: req.body.Nom,
            Description: req.body.Description,
            Date_Debut: req.body.Date_Debut ?? '',
            Date_Fin: req.body.Date_Fin ?? '',
            Priorite: req.body.Priorite ?? ''
        });
        projet.Taches.push(T)
        projet.save()
        res.json(T)
    } catch (error) {
        res.json(error)
    }
});

router.post('/affecter/:_id', async (req, res) => {

    try {

        let userId = req.body.userId
        let tache = await Tache.findOne({ User: userId, Etat: 'En cours' })

       {
            let affectTache = await Tache.findById(req.params)
            affectTache.User = userId;
            affectTache.save();
            res.json(affectTache)
        }

    } catch (error) {

    }



})




module.exports = router;