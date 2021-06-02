const express = require('express');

const CorridaController = require('../../controllers/CorridaController');
const { validateJWT } = require('../../middleware/Token');

const routes = express.Router();

// CARONAS
routes.use(validateJWT);
routes.get('/', CorridaController.index);
routes.get('/active', CorridaController.active);
routes.get('/:id', CorridaController.show);
routes.post('/', CorridaController.store);
routes.put('/:id', CorridaController.update);
routes.delete('/:id', CorridaController.delete);

module.exports = routes;
