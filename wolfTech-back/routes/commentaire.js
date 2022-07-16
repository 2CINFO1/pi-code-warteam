var Commentaire = require('../model/commentaire');
var express = require('express');
const commentaire = require('../model/commentaire');
const User = require("../model/user");
const Reponse = require('../model/reponse');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const app = express();
app.use(bodyParser.json());
const { badwords } = require('../data.json');
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");

const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: "hamzarahali61@gmail.com",
        pass: "csvxokfsboedyhzb",
    },
    secure: true,
});

//liste des commentaire
router.get('/', function (req, res) {
    Commentaire.find(function (err, data) {
        if (err) throw err;
        // res.render("showcontact.twig", {data})
        res.json(data);
    });
});
//upload file en comment
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname + '/uploads/'));
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
let upload = multer({ storage });
//Ajouter commentaire 
router.post('/add', [
    check('TextC').isString(),
    check('TextC').isLength({ min: 5 })
],async (req, res) => {
    // const errors = validationResult(req);
    let confirm = false;
    let words = req.body.TextC.split(" ")
    var i;
    for (i = 0; i < badwords.length; i++) {
        if (badwords[i].indexOf(words) !== -1)
            confirm = true;
        //textC.delete();

        break;
    }
    if (confirm) {
        const mailData = {
            from: "aymen.neji@esprit.com", // sender address
            to: "hamzarahali61@gmail.com", // list of receivers(req.user.email)
            subject: "Bad words ",
            text: "You are not allowed to send badwords here",
            html: "<h3>You are not allowed to send badwords here</h3>"
        };

        transporter.sendMail(mailData, function (err, info) {
            if (err) res.send(err);
            else res.send("msg send");
        });

        return res.status('400').json('bad words')
    }
    //



    // upload.single('file'), function (req, res) { }
    let rep = await Reponse.findById(req.body.Reponse)
    var c = new Commentaire({
        textC: req.body.TextC,
        Reponse: rep
    });
    c.save();
    res.json(c)
    // upload(req, res, function (err) {
    //     if (err) {
    //         return res.end("Error uploading file.");
    //     }
    //     res.end("File is uploaded");
    // });
});
router.delete('/delete/:_id', async (req, res) => {
    console.log(req.params);
    await Commentaire.findByIdAndDelete(req.params)
    res.json('delete success')

});
router.get('/afficher', async (req, res) => {
    let commentaire = await Commentaire.find();
    res.json(commentaire)
});
router.post('/update/:_id', async (req, res) => {
    let commentaire = await Commentaire.findById(req.params);
    console.log('tesdt ', commentaire);
    commentaire.textC = req.body.textC
    commentaire.save()
    res.json(commentaire)
})
/*app.post('/commentaires', [
    check('TextC').isString(),
    check('TextC').isLength({ min: 5 })
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.send('comment saved');
  });
  //app.listen(3000, () => console.log('server started'));*/
module.exports = router