const Router = require("express").Router;

const turmaController = require("../controllers/turmaController");

const turmaRouter = new Router();

turmaRouter.get("/", turmaController.index);

turmaRouter.get("/:id", turmaController.show);

turmaRouter.post("/", turmaController.store);

turmaRouter.put("/:id", turmaController.update);

turmaRouter.delete("/:id", turmaController.delete);

module.exports = turmaRouter;
