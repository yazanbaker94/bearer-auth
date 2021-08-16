'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js')

module.exports = async (req, res, next) => {
  const _authError = "no auth"
  if (!req.headers.authorization) { return console.log(_authError); }

  console.log('authorization req: ', req.headers.authorization)
  let basic = req.headers.authorization.split(' ');

  let encoded = basic.pop();
  console.log(encoded)
  let decoded = base64.decode(encoded); // username:password

  let [username, password] = decoded.split(":"); // rawan test@1234
  console.log('my username', username)

  console.log('my pass', password)


  
  console.log(req.dataValues)
    req.dataValues = await users.authenticateBasic(username, password)
    // res.status(200).send(req.dataValues.password);
    next();
  
    // res.status(403).json('Invalid Login');
  

}

