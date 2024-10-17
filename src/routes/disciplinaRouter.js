const Router = require("express").Router;

const disciplinaController = require("../controllers/disciplinaController");

const disciplinaRouter = new Router();

disciplinaRouter.get("/", disciplinaController.index);

disciplinaRouter.get("/:id", disciplinaController.index);

disciplinaRouter.post("/", disciplinaController.store);

disciplinaRouter.put("/:id", disciplinaController.update);

disciplinaRouter.delete("/:id", disciplinaController.delete);

module.exports = disciplinaRouter;
