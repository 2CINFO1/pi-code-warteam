var Reponse = require('../model/reponse');
var express = require('express');
const reponse = require('../model/reponse');
var router = express.Router();
//liste des reponse
router.get('/', function(req, res){
    Reponse.find(function (err, data){
        if(err) throw err;
        // res.render("showcontact.twig", {data})
        res.json(data);
    });
});

//Ajouter reponse 
router.post('/add', function(req, res){
    var c = new Reponse ({
        textR : req.body.textR
    });
    c.save();
    res.json(c)
});
router.get('/delete/:_id', async(req, res) => {
    console.log(req.params);
    await Reponse.findByIdAndDelete(req.params)
    res.json('delete success')

});
router.get('/afficher', async(req, res) => {
    let reponse = await Reponse.find();
    res.json(reponse)
});
router.post('/update/:_id', async(req, res) => {
    let reponse = await Reponse.findById(req.params);
    console.log('tesdt ', reponse);
    reponse.textR = req.body.textR
    reponse.save()
    res.json(reponse)
})

module.exports = router