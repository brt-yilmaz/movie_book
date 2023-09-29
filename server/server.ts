import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ErrorRequestHandler } from 'express';
import sendEmail from './utils/email';

// to avoid uncaughtException
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//For env File 
dotenv.config();
import app from './app';

// MONGOOSE SETUP
const PORT = process.env.PORT || 5000;
const uri: string = process.env.DB_URI || '';

mongoose
  .connect(uri)
  .then(() => console.log(`DB connection successful! 🎉`))

// custom error handler

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

export default errorHandler;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

  process.on('unhandledRejection', (err: Error) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  