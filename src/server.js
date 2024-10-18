require("dotenv").config();
require("./database");

const { resolve } = require("path");

const express = require("express");

const cors = require("cors");

const app = express();

const alunoRoutes = require("./routes/alunoRouter");
const avisoRoutes = require("./routes/avisoRouter");
const professorRoutes = require("./routes/professorRouter");
const turmaRoutes = require("./routes/turmaRouter");
const fotoRouter = require("./routes/fotoRouter");

const port = process.env.SERVER_PORT;

//Definindo middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(resolve(__dirname, "..", "uploads")));

//Definindo rotas
app.use("/alunos", alunoRoutes);
app.use("/avisos", avisoRoutes);
app.use("/professores", professorRoutes);
app.use("/turmas", turmaRoutes);
app.use("/fotos", fotoRouter);

app.listen(port, () => {
  console.log(
    `Server running on port: ${port}\nlink on: http://localhost:${port}`
  );
});
