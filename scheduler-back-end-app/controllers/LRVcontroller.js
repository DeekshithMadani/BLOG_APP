const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../models/mongo_auth_model');

const handleLogin = async (req, res) => {
    let unameDetails = await Auth.find({ uname: req.body.uname });
    if (unameDetails.length == 0) {
        res.status(301).json({ Login: false, comment: "User doesn't exist. Please Register" });
    }
    else if (await bcrypt.compare(req.body.pwd, unameDetails[0].pwd)) {
        const token = jwt.sign(
            {
                uname: req.body.uname
            },
            'secret123'
        )
        res.status(200).json({ Login: true, comment: "login successfully", token: token });
    }
    else {
        res.status(301).json({ Login: false, comment: "Wrong password" });
    }
}

const handleRegister = async (req, res) => {
    try {
      let unames = await Auth.find({ uname: req.body.uname });
      if (unames.length > 0) {
        res.status(301).json({ Registered: false, comment: 'user already exists' });
      }
      else {
        const genSalt = bcrypt.genSaltSync();
        const hashPwd = bcrypt.hashSync(req.body.pwd, genSalt);
        const userIns = await Auth.create([{ uname: req.body.uname, pwd: hashPwd, firstName:req.body.firstName,lastName:req.body.lastName }]);
        res.status(200).json({ Registered: true, comment: 'user registered sucessfully' });
      }
    }
    catch (err) {
      res.status(500).send(err);
    }
  }

const handleValidateUser = async (req, res) => {
    const token = req.body.token;
    try {
        const decoded = jwt.verify(token, 'secret123');
        const uname = decoded.uname;
        const user = await Auth.findOne({ uname: uname });
        if (user) {
            return res.json({ status: 'ok' });
        }
        else {
            res.json({ status: 'error', error: 'invalid token' });
        }
    }
    catch (err) {
        res.json({ status: 'error', error: 'invalid token' });
    }

}

module.exports = {handleLogin,handleRegister,handleValidateUser};