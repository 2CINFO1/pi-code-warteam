var express = require('express');
var router = express.Router();
const User = require("../model/user");
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const role = require('../model/role');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Register
router.post("/register", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

  // check if user already exist
  // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    console.log(oldUser);

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

   //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword)
  //   // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

   // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      'wolf-tech',
      {
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
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        'wolf-tech',
        {
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

router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

/* add role. */
router.post('/addRole', function(req, res, next) {
   
  let role = role.create(req.body);
  res.json(role);
});

/* update role. */
router.get('/updateRole/:_id', async (req, res) => {
  let role =  await role.findById(req.params);

  res.json(role)
})

module.exports = router;
