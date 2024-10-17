require("dotenv").config();
const port = process.env.SERVER_PORT;
const express = require("express");
const { resolve } = require("path");
require("./database");
const app = express();
const diciplinaRoutes = require("./routes/disciplinaRouter");
const alunoRoutes = require("./routes/alunoRouter");
const avisoRoutes = require("./routes/avisoRouter");
const professorRoutes = require("./routes/professorRouter");
const turmaRoutes = require("./routes/turmaRouter");
const fotoRouter = require("./routes/fotoRouter");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(resolve(__dirname, "..", "uploads")));
app.use("/disciplinas", diciplinaRoutes);
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
