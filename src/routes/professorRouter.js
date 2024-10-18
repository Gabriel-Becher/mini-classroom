const Router = require("express").Router;

const professorController = require("../controllers/professorController");

const professorRouter = new Router();

professorRouter.get("/", professorController.index);

professorRouter.get("/:id", professorController.show);

professorRouter.post("/", professorController.store);

professorRouter.put("/:id", professorController.update);

professorRouter.delete("/:id", professorController.delete);

module.exports = professorRouter;
