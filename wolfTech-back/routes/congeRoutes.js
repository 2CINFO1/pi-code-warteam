var express = require('express');
var router = express.Router();
var Conge = require('../model/conge');
//const auth = require("../middleware/auth");
var multer = require('multer');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const Role = require('../model/role');
const user = require('../model/user');
const nodemailer = require('nodemailer');
/****************************************************/

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "wolf.tech77777@gmail.com",
        pass: "omqvfeyrdkfxgebr"
    }
});


function getMonthDifference(startDate, endDate) {
    return (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
    );
}




/****************************************************/


router.get('/display', async(req, res) => {
    let conges = await Conge.find().populate('user');
    res.json(conges)
});

/////////////////////////
router.get('/display/user', async(req, res) => {
    let conges = await Conge.find({ user: user_id }).populate('user');
    res.json(conges)
});

////////////////////////////

router.post('/add', async(req, res, next) => {

    const {
        leave_subject,
        start_date,
        end_date,
        days,
        status = "pending",
        /* user: {
             first_name,
             last_name
         }*/
    } = req.body;

    let conge = await Conge.create({
        ...req.body,
        // user: req.user.user_id
    });
    if (status == 'pending') {


        var mailOptions = {
            from: "wolf.tech77777@gmail.com", // sender address
            to: "ferjani.naoufel22@gmail.com", // list of receivers
            subject: leave_subject + " request",

            text: "Dear",
            html: "I'm writing to ask for " + leave_subject + " in advance of my entitlements." +
                "<br>" +

                "I'd like to take my leave between the following dates " + start_date + " and " +
                end_date + ".<br>" +
                "Sincerely",
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } else if (status == 'approved') {
        let conge = await conge.findOne({ _id: reqParameterID }, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                let userr = user.findOne(conge.user_id);
                console.log(userr);
            }
        });
    }
    res.json(conge)
});
/**************************  FILE UPLOAD  ********************* */
/*
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.join(__dirname + '/uploads/'));
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
let upload = multer({ storage });

router.post('/add', upload.single('file'), function(req, res) {


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
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
*/

/*************************************************************************************************************************** */
router.get('/delete/:_id', async(req, res) => {
    await Conge.findByIdAndDelete(req.params)
    res.json('delete success')

});

router.post('/update/:_id', async(req, res) => {
    let conge = await Conge.updateOne(req.params, req.body);
    res.json(conge)
})

module.exports = router