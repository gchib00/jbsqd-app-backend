const router = require("express").Router();
const fetch = require("node-fetch");
import { Request, Response } from "express";
import { CountryName } from "../types";

router.get("/", async (req: Request, res: Response) => {
  try {
    const searchedCountry = req.query.search;
    if (!searchedCountry) {
      res.status(200).json(null); //if user doesn"t provide an input, we should return null and prevent API from being called
    }
    const response = await fetch(`https://restcountries.com/v3.1/name/${searchedCountry}`)
      .then((res: Response) => res.json());
    const countryNames: CountryName[] = [];
    response.map((countryData: any) => countryNames.push(countryData.name as CountryName));
    res.status(200).json(countryNames);
  } catch(err) {
    console.error(err);
    res.status(200).json(null); //returning null will cause frontend to empty the list
  }
});

module.exports = router;