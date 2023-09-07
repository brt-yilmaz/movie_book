import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//For env File 
dotenv.config();

const app: Application = express();



// MONGOOSE SETUP
const PORT = process.env.PORT || 5000;
const uri: string = process.env.DB_URI || '';
mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
