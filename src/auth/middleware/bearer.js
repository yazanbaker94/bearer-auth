'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

 
  try {
    if (!req.headers.authorization) { return 'Invalid Loginsss' }

    const token = req.headers.authorization.split(' ').pop();
    console.log('the token: ', token)
    const validUser = await users.authenticateToken(token);
    console.log('valid user x', validUser)

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    console.log(e);
    res.status(403).send('Invalid Login');;
  }
  
 
 
  
}
