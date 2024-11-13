const Router = require("express").Router;

const alunoRouter = new Router();

const alunoController = require("../controllers/alunoController");

alunoRouter.get("/?name", alunoController.index);

alunoRouter.get("/:id", alunoController.show);

alunoRouter.post("/", alunoController.store);

alunoRouter.put("/:id", alunoController.update);

alunoRouter.delete("/:id", alunoController.delete);

module.exports = alunoRouter;
