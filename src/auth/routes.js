'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const authRouter = express.Router();
require("dotenv").config();


const { users } = require('./models/index.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    console.log("inside signup")
    
    console.log("req.body.password :", req.body.password)
    
    let userRecord = await users.create(req.body);
    

    const output = {
      user: userRecord,
      token: userRecord.token,
      
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (request, res, next) => {
  request.body = {
    user: request.dataValues.username,
    token: request.dataValues.token,
  };
  res.status(200).json(request.body);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const usersF = await users.findAll({});
  const list = await usersF.map(user => user.username);
 await res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;
