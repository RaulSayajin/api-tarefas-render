const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

let tarefas = [
  { id: 1, titulo: "Aprender CI/CD", concluida: false },
  { id: 2, titulo: "Fazer deploy no Render", concluida: false }
];

app.get("/tarefas", (req, res) => {
  res.json({
    mensagem: "Tarefas carregadas com sucesso",
    total: tarefas.length,
    tarefas: tarefas
  });
});

app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: "Titulo e obrigatorio" });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo: titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);
  res.status(201).json({ mensagem: "Tarefa criada", tarefa: novaTarefa });
});

app.patch("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { concluida } = req.body;

  const tarefa = tarefas.find(t => t.id == id);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa nao encontrada" });
  }

  tarefa.concluida = concluida;
  res.json({ mensagem: "Tarefa atualizada", tarefa: tarefa });
});

app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  tarefas = tarefas.filter(t => t.id != id);
  res.json({ mensagem: "Tarefa deletada" });
});

app.get("/", (req, res) => {
  res.json({
    status: "API de Tarefas rodando com CI/CD no Render",
    versao: "1.0.3",
    emoji: ":rocket:",
    timestamp: new Date().toISOString(),
    dataCriacaoApi: "2026-05-29"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
