const express = require('express');

const routes = express.Router();

const SessionController = require('../../controllers/SessionController');
const { generateJWT } = require('../../middleware/Token');

routes.post('/', generateJWT, SessionController.login);

module.exports = routes;
