const Router = require("express").Router;

const avisoController = require("../controllers/avisoController");

const avisoRouter = new Router();

avisoRouter.get("/", avisoController.index);

avisoRouter.get("/:id", avisoController.index);

avisoRouter.post("/", avisoController.store);

avisoRouter.put("/:id", avisoController.update);

avisoRouter.delete("/:id", avisoController.delete);

module.exports = avisoRouter;
