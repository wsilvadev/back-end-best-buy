const express = require("express");

const LoginController = require("./database/controllers/LoginControllers");
const ShopsController = require("./database/controllers/ShopsControllers");

const routes = express.Router();

routes.post("/login", LoginController.create);
routes.get("/login", LoginController.index);

routes.post("/shops", ShopsController.create);
routes.get("/shops", ShopsController.index);

module.exports = routes;
