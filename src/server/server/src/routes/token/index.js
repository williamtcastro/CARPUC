const express = require('express');

const routes = express.Router();

const { validateJWT } = require('../../middleware/Token');

routes.get('/', validateJWT, (req, res) => res.status(200).json({
  status: true,
}));

module.exports = routes;
