const express = require('express');

const routes = express.Router();

const { generateJWT } = require('../middleware/Token');
const Carros = require('./car');
const Login = require('./login');
const Register = require('./register');
const Caronas = require('./rides');
const Token = require('./token');
const Usuario = require('./usuario');
// const Confirm = require('./confirm');
// const Orders = require('./orders');
// const Product = require('./product');
// const Recover = require('./recover');
// const Reset = require('./reset');

routes.get('/', (req, res) => res.status(200).json({ msg: 'Hello World from PUCAR' }));
routes.use('/register', generateJWT, Register);
routes.use('/login', Login);
routes.use('/user', Usuario);
routes.use('/token', Token);
routes.use('/cars', Carros);
routes.use('/rides', Caronas);
// routes.use('/recover', Recover);
// routes.use('/orders', Orders);
// routes.use('/reset', Reset);
// routes.use('/product', Product);
// routes.use('/confirm', Confirm);

module.exports = routes;
