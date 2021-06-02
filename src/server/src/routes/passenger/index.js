const express = require('express');

const PassageiroCaronaController = require('../../controllers/PassageiroCaronaController');
const { validateJWT } = require('../../middleware/Token');

const routes = express.Router();

// CARONAS
routes.use(validateJWT);

// PASSAGERIO CARONA
routes.get('/:id_carona', PassageiroCaronaController.index);
routes.post('/:id_carona', PassageiroCaronaController.store);
routes.put('/:id_carona', PassageiroCaronaController.update);
routes.delete('/:id_carona/p/:id', PassageiroCaronaController.delete);

// routes.put('/:id', CorridaController.update);

module.exports = routes;
