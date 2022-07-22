/*var express = require('express');
var router = express.Router();
var Conge = require('../model/conge');
//const auth = require("../middleware/auth");
var multer = require('multer');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const Role = require('../model/role');
const User = require('../model/user');
const nodemailer = require('nodemailer');
const auth = require("../middleware/auth");
const Solde = require('../model/soldeconge');
const date = new Date();


function getMonthDifference(startDate) {
    let month = date.getMonth() + 1
    let year = date.getFullYear

    return (

        month -
        startDate.getMonth() +
        12 * (year - startDate.getFullYear())
    );
}

router.post('/add/', /* auth,*/
/*async(req, res, next) => {
    let user = await User.findById(req.params);
    
    let solde = await Solde.create({
        ...req.body,
        soldec = getMonthDifference(user.),
        user: '62c1775c52d6fb1a1892f53a' // req.user.user_id
    });
})*/