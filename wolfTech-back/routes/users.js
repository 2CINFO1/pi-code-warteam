var express = require('express');
var router = express.Router();
const User = require("../model/user");
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Role = require('../model/role');
var multer  =   require('multer');

//Email API
const nodemailer = require("nodemailer");
const user = require('../model/user');
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "ramikaabi93@gmail.com",
    pass: "tfmypogadvvzxyxw",
  },
  secure: true,
});




/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads');
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const uploadImg = multer({storage: storage});

// Register
router.post("/register",uploadImg.single('file'),async (req, res) => {
  try {
    // Get user input
    const {
      first_name,
      last_name,
      email,
      password,
      role
    } = req.body;

    let image;
    if (req.file)  image  = req.file.path;



    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({
      email
    });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);
    //   // Create user in our database
    roleUser = await Role.findOne({
      name: role
    })

    const user = await User.create({
      first_name,
      role: roleUser,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      image
    });

    if (role == 'manager' || role == 'consultant') {
      const mailData = {
        from: "ramikaabi93@gmail.com", // sender address
        to: user.email, // list of receivers
        subject: "Invite " + role,
        text: "Here is your account",
         html: "<h3>Bonjour</h3>" + first_name +
           "<br>" +

           "Email : " + email +
           "<br>Password : " +
          password,
      };

      transporter.sendMail(mailData, function (err, info) {
        if (err) res.send(err);
        else res.send("msg send");
      });
    }

    // Create token
    const token = jwt.sign({
        user_id: user._id,
        email
      },
      'wolf-tech', {
        expiresIn: "24h",
      }
    );

    // save user token
    user.token = token;

    //   // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// Login
router.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const {
      email,
      password
    } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({
      email,
      blocked: false
    }).populate('role')

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({
          user_id: user._id,
          email
        },
        'wolf-tech', {
          expiresIn: "24h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});


router.get("/:userId", auth, async (req, res) => {
  try {
    res.status(200).json(await User.findById(req.params.userId))
  } catch (error) {

  }
});

router.post("/blocked", auth, async (req, res) => {
  try {
    let user = await User.findById(req.body.userId);
    if (user) {
      user.blocked = true;
      user.save();
      res.status(200).json("User Blocked");
    }
    res.status(200).json("User not existe");

    
    
    
  } catch (error) {

  }
});

//reset password
router.post("/reset", async(req,res)=>{
  let user = req.body.userMail;
  try {
    const Data = {
      from: "ramikaabi93@gmail.com", // sender address
      to: user, // list of receivers
      subject: "reset password ",
      text: "Here is your account",
       html: "<a>Bonjour Mr</a>" + 
       "<a href='www.google.com'>Reset Password</a>"
    };

    transporter.sendMail(Data, function (err, info) {
      if (err) res.send(err);
      else res.send("msg send");
    });
    
  } catch (error) {
    
  }
})

router.post("/display", async (req, res) => {
  try {
    let roleUser = await Role.findOne({
      name: req.body.role
    })
    res.json({
      user : await user.find({role: roleUser.id}).populate('role')
    })
  } catch (error) {

  }
});


router.post('/update', auth, async (req, res) => {
  let user =  await User.findById({_id: req.user.user_id})
  user.password =  await bcrypt.hash(req.body.password, 10);
  user.save()
  res.json(user)
})

module.exports = router;