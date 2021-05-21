const express = require('express');

const Usuario = require('../../controllers/UsuarioController');
const { validateJWT } = require('../../middleware/Token');

const routes = express.Router();

routes.use(validateJWT);
routes.get('/', Usuario.index);

module.exports = routes;
