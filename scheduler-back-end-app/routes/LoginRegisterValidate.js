const express = require('express');
const LRVrouter = express.Router();
const LRVcontroller = require('../controllers/LRVcontroller');


LRVrouter.post('/', LRVcontroller.handleLogin);
LRVrouter.post('/register', LRVcontroller.handleRegister);
LRVrouter.post('/validateuser', LRVcontroller.handleValidateUser);


module.exports = LRVrouter;