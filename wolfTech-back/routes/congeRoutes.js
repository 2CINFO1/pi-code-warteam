var express = require('express');
var router = express.Router();
var Conge = require('../model/conge');
var multer = require('multer');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const Role = require('../model/role');
const user = require('../model/user');
const nodemailer = require('nodemailer');
const auth = require("../middleware/auth");
const { body } = require('express-validator');

/****************************************************/

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "wolf.tech77777@gmail.com",
        pass: "omqvfeyrdkfxgebr"
    }
});




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

router.post('/add', auth, async(req, res, next) => {
    let conge = await Conge.create({
        ...req.body,
        user: req.user.user_id,
        status: "pending"
    });
    if (conge.status == 'pending') {
        var mailOptions = {
            from: "wolf.tech77777@gmail.com",
            to: req.user.email,
            subject: conge.leave_subject + " request",

            text: "Dear",
            html: "I'm writing to ask for " + conge.leave_subject + " in advance of my entitlements." +
                "<br>" +

                "I'd like to take my leave between the following dates " + conge.start_date + " and " +
                conge.end_date + ".<br>" +
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

router.get('/delete/:_id', async(req, res) => {
    await Conge.findByIdAndDelete(req.params)
    res.json('delete success')

});

router.post('/update/:_id', async(req, res) => {
    let conge = await Conge.updateOne(req.params, req.body);
    res.json(conge)
})

router.post('/status/:_id', async(req, res) => {
    try {
        let conge = await Conge.findOneAndUpdate(req.params, { status: req.body.status }).exec()
            // if (conge.status == 'approved') {
            //     console.log('test');
            //     var mailOptions = {
            //         from: "wolf.tech77777@gmail.com",
            //         to: conge.user.email,
            //         subject: conge.leave_subject + " request",

        //         text: "Dear",
        //         html: "I'm writing to ask for " + conge.leave_subject + " in advance of my entitlements." +
        //             "<br>" +

        //             "I'd like to take my leave between the following dates " + conge.start_date + " and " +
        //             conge.end_date + ".<br>" +
        //             "Sincerely",
        //     };

        //     transporter.sendMail(mailOptions, function(error, info) {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             console.log('Email sent: ' + info.response);
        //         }
        //     });
        // }
        res.json(conge)
    } catch (error) {
        res.json(error.message)
    }
})
router.post("/updateStatus", async(req, res) => {
    try {
        const conge = await Conge.findOne({ _id: req.body.id }).populate('user');
        conge.approved = req.body.approved
        conge.denied = req.body.denied
        conge.status = req.body.status
        conge.save();

        if (conge.approved) {
            // console.log(conge);
            var mailOptions = {
                from: "wolf.tech77777@gmail.com",
                to: conge.user.email,
                subject: conge.leave_subject + " request",

                text: "Dear",
                html: "I'm writing to ask for " + conge.leave_subject + " in advance of my entitlements." +
                    "<br>" +

                    "I'd like to take my leave between the following dates " + conge.start_date + " and " +
                    conge.end_date + ".<br>" +
                    "Sincerely",
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        res.json(conge)

    } catch (error) {

    }
})

router.get('/my-leaves', auth, async(req, res) => {
    try {
        let conges = await Conge.find({ user: req.user.user_id }).populate('user');
        res.status(200).json(conges)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/stats', auth, async(req, res) => {
    try {
        let totalConges = await user.findById(req.user.user_id)
        let dateUser = totalConges.created_at
        let currentDate = new Date()
        let diff = currentDate.getTime() - dateUser.getTime()
        let days = Math.ceil(diff / (1000 * 3600 * 24));
        res.status(200).json({
            'conges': await Conge.find({ user: req.user.user_id }).count(),
            'total': Math.round((days / 30) * 2),
            'start': totalConges.created_at,
            'pending': await Conge.find({ user: req.user.user_id, status: 'pending' }).count(),
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/allstats', auth, async(req, res) => {
    try {
        let totalConges = await user.findById(req.user.user_id)
        let dateUser = totalConges.created_at
        let currentDate = new Date()
        let diff = currentDate.getTime() - dateUser.getTime()
        let days = Math.ceil(diff / (1000 * 3600 * 24));
        res.status(200).json({
            'conges': await Conge.find().count(),
            'pending': await Conge.find({ status: 'pending' }).count(),
            'approved': await Conge.find({ status: 'approved' }).count(),
            'denied': await Conge.find({ status: 'denied' }).count(),
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router