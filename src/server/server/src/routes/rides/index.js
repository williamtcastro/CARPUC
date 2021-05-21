const express = require('express');

const CorridaController = require('../../controllers/CorridaController');
const PassageiroCaronaController = require('../../controllers/PassageiroCaronaController');
const { validateJWT } = require('../../middleware/Token');

const routes = express.Router();

// CARONAS
routes.use(validateJWT);
routes.get('/', CorridaController.index);
routes.get('/:id', CorridaController.show);
routes.post('/', CorridaController.store);
routes.put('/:id', CorridaController.update);
routes.delete('/:id', CorridaController.delete);

// PASSAGERIO CARONA
routes.get('/:id_carona/p', PassageiroCaronaController.index);
// routes.get('/:id_carona/p/show', PassageiroCaronaController.show);
routes.post('/:id_carona/p', PassageiroCaronaController.store);
routes.put('/:id_carona/p', PassageiroCaronaController.update);
routes.delete('/:id_carona/p/:id', PassageiroCaronaController.delete);

// routes.put('/:id', CorridaController.update);

module.exports = routes;
