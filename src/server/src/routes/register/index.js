const express = require('express');

const UsuarioController = require('../../controllers/UsuarioController');

const routes = express.Router();

routes.post('/', UsuarioController.store);

module.exports = routes;
