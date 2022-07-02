var express = require('express');
var router = express.Router();
const Role = require('../model/role');
/* add role. */
router.post('/create', async (req, res, next) => {
   try {
    let role = await Role.create(req.body);
    console.log(role);
    res.json(role);
   } catch (error) {    
   }
    
  });
  
  /* update role. */
  router.get('/updateRole/:_id', async (req, res) => {
    let role =  await role.findById(req.params);
  
    res.json(role)
  })
  
  module.exports = router;