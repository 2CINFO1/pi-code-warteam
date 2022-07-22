var Reponse = require('../model/reponse');
var express = require('express');
const reponse = require('../model/reponse');
const commentaire = require('../model/commentaire');
var router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { response } = require('express');
const app = express();
const User = require("../model/user");
const auth = require("../middleware/auth");
app.use(bodyParser.json());
//liste des reponse
router.get('/:_id', async (req, res)=> {
    try {
        let responses = await Reponse.find({commentaire: req.params._id}).populate('user')
        res.json(responses)
    } catch (error) {
        res.json(error.message)
    }
});

//Ajouter reponse 
router.post('/add', auth, [
    check('textR').isString(),
    check('textR').isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let user = await User.findOne({_id: req.user.user_id})
        let comment = await commentaire.findById(req.body.commentaire)
        var c = new Reponse({
            textR: req.body.textR,
            commentaire: comment,
            user
        });
        c.save();
        res.json(c)
    });



router.delete('/delete/:_id', async (req, res) => {
    console.log(req.params);
    await Reponse.findByIdAndDelete(req.params)
    res.json('delete success')

});
router.get('/afficher', async (req, res) => {
    let reponse = await Reponse.find();
    res.json(reponse)
});
router.post('/update/:_id', async (req, res) => {
    let reponse = await Reponse.findById(req.params);
    console.log('tesdt ', reponse);
    reponse.textR = req.body.textR
    reponse.save()
    res.json(reponse)
})

module.exports = router