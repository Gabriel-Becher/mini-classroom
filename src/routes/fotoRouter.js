const Router = require("express").Router;

const fotoController = require("../controllers/fotoController");

const fotoRouter = new Router();

fotoRouter.post("/", fotoController.store);

fotoRouter.delete("/:id", fotoController.delete);

fotoRouter.put("/:id", fotoController.update);

module.exports = fotoRouter;
