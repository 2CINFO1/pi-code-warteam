var Commentaire = require('../model/commentaire');
var express = require('express');
const commentaire = require('../model/commentaire');
const Reponse = require('../model/reponse');
var router = express.Router();
//liste des commentaire
router.get('/', function(req, res){
    Commentaire.find(function (err, data){
        if(err) throw err;
        // res.render("showcontact.twig", {data})
        res.json(data);
    });
});

//Ajouter commentaire 
    router.post('/add', async (req, res) => {
        let rep = await Reponse.findById(req.body.Reponse)
        var c = new Commentaire ({
            textC : req.body.TextC,
            Reponse: rep
        });
    c.save();
    res.json(c)
});
router.get('/delete/:_id', async(req, res) => {
    console.log(req.params);
    await Commentaire.findByIdAndDelete(req.params)
    res.json('delete success')

});
router.get('/afficher', async(req, res) => {
    let commentaire = await Commentaire.find();
    res.json(commentaire)
});
router.post('/update/:_id', async(req, res) => {
    let commentaire = await Commentaire.findById(req.params);
    console.log('tesdt ', commentaire);
    commentaire.textC = req.body.textC
    commentaire.save()
    res.json(commentaire)
})

module.exports = router