const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); 
import { Request, Response } from "express";
import { UserLoginObj, UserRegistrationObj } from "../types";

//Registration:
const hashPassword = async (providedPassword: string) => { //fn to encrypt the password before it's passed to DB
  const salt = await bcrypt.genSalt(8);
  return await bcrypt.hash(providedPassword, salt) as string;
};
router.post("/register", async (req: Request, res: Response) => {
  const credentials: UserRegistrationObj = {
    username: req.body.username,
    email: req.body.email,
    coins: 20,
    password: req.body.password,
    repeatedPassword: req.body.repeatedPassword 
  };
  if (credentials.password === credentials.repeatedPassword) {
    const user = await User.findOne({username: credentials.username}); //check if username already exists in DB
    const email = await User.findOne({email: credentials.email}); //check if an user by this email already exists in DB
    if (user || email) { 
      return res.status(400).send({message: "This user already exists. Please choose a different username/email and try again."});
    }
    try {
      const hashedPassword = await hashPassword(credentials.password); //encrypt the password before saving it to DB
      const newUser = new User({
        username: credentials.username,
        email: credentials.email,
        password: hashedPassword
      });
      await newUser.save(); //save user to DB
      return res.status(200).send(`User ${newUser.username} has been registered successfully.`);
    } catch(err) {
      return res.status(400).send({message: err});
    }
  } else {
    return res.status(400).send({message: "Passwords don't match!"});
  }
});

//Login:
router.post("/login", async (req: Request, res: Response) => {
  try { 
    const credentials: UserLoginObj = {
      username: req.body.username,
      password: req.body.password
    };
    const user = await User.findOne({username: credentials.username}); //check if user exists in DB
    const match: boolean = await bcrypt.compare(credentials.password, user.password); //check if password is correct
    if (!match) { //send error if the provided password doesn't match the user's password
      res.status(400).send({message: "Username or password is incorrect!"});
    } else {
      const loginToken = jwt.sign({_id: user._id}, process.env.SECRET_VALUE_FOR_TOKEN) as string; //generate a jwt token
      res.status(200).send({token: loginToken, user: user});  
    }
  } catch(err){
    res.status(400).send({message: "Username or password is incorrect!"});
  }
});

//Auto-login
router.post("/autoLogin", async (req: Request, res: Response) => {
  const token: string = req.body.token; 
  if (token) {
    try {
      const authenticatedUser = await jwt.verify(token, process.env.SECRET_VALUE_FOR_TOKEN);
      const user = await User.findOne({_id: authenticatedUser._id});
      res.status(200).send({user: user});
    } catch (err) {
      res.status(400).send({message: "Couldn't retrieve the user"});
    }
  }   
});

module.exports = router;