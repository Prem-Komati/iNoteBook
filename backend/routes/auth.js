const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var fetchuser = require('.././middleware/fetchuser')
const JWT_SECRET = "PremIsthe$oy"


//Route - 1 : create a user using POST "http://localhost:5000/api/auth/createuser" no login required
router.post('/createuser', [
    body('name').isLength({min : 3}),
    body('email').isEmail(),
    body.apply('password').isLength({min:5})
], async (req, res)=>{
  let success = false
  // If there are errors, return bas request and the errors
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({success, result: result.array()})
  }
  //check whether user is already with this email

  try{

  
  let user  = await User.findOne({email: req.body.email});
  if(user){
    return res.status(400).json({success, error:"user is already exist with this email"})
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt)
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass
  })
  const data = {
    user:{
      id : user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);

  success = true;
  res.json({success, authtoken})
  //.then(user=>res.json(user)).catch(err=>{console.log(err)
  //res.json({error:'please enter a valid email'})})
} catch(error){
  console.log(error.message);
  res.status(500).send("some error occurred")
}
  
})

//Route - 2 : Authinticate a user using POST "http://localhost:5000/api/auth/login" no login required

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});
/*router.post('/login', [
  body('email').isEmail(),
  body('password','Password cannot be blank').exists()
], async (req, res)=>{

  let success = false;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({result: result.array()})
  }

  const {email, password} = req.body;
  try{
    let user  = await User.findOne({email});
    if(!user){
      success = false;
      return res.status(400).json({error:"Please try to login with correct crendential"})
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {

      success = false;
      return res.status(400).json({success,error:"Please try to login with correct crendential"}) 
  }  

  const data = {
    user:{
      id : user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  success = true;
  res.json({ success, authtoken })
  }
  catch(error){
    console.log(error.message);
    res.status(500).send("some error occurred")
  }
})*/


//Route - 3 : Get loggedin user details POST "http://localhost:5000/api/auth/getuser" login required

router.post('/getuser', fetchuser, async (req, res)=>{

try {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user)
} catch(error){
  console.log(error.message);
  res.status(500).send("some error occurred")
}
})
module.exports = router