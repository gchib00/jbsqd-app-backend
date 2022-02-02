const router = require("express").Router();
const User = require("../models/user"); 
import { Request, Response } from "express";

router.put("/updateBalance", async (req: Request, res: Response) => {
  try { 
    await User.findOneAndUpdate({username: req.body.username}, {coins: req.body.coins});
    res.status(200).send({message: "balance has been updated successfully!"});
  } catch(err){
    res.status(400).send({message: "Couldn't update user's balance!"});
  }
});

module.exports = router;