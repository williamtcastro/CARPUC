const express = require('express');

const VeiculoController = require('../../controllers/VeiculoController');
const { validateJWT } = require('../../middleware/Token');

const routes = express.Router();

// routes.get('/category/:id', ProductController.showCategory);
// routes.get('/category/:id/top', ProductController.showCategoryTop);
// routes.get('/top', ProductController.indexTop);

routes.use(validateJWT);
routes.get('/', VeiculoController.index);
routes.get('/:placa', VeiculoController.show);
routes.post('/', VeiculoController.store);
routes.delete('/:placa', VeiculoController.delete);
routes.put('/:placa', VeiculoController.update);

module.exports = routes;
