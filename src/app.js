const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(201).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0,
  };


  

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { url, title, techs } = request.body;
  const hasRepository = repositories.findIndex(
    (repository) => repository.id === request.params.id
  );
  if (hasRepository === -1) {
    return response.status(400).json();
  }

  repositories[hasRepository] = {
    ...repositories[hasRepository],
    url,
    title,
    techs,
  };

  return response.status(200).json(repositories[hasRepository]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const hasRepository = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (hasRepository === -1) {
    return response.status(400).json();
  }

  repositories.splice(hasRepository, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const hasRepository = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (hasRepository === -1) {
    return response.status(400).json();
  }
  repositories[hasRepository] = {
    ...repositories[hasRepository],
    likes: repositories[hasRepository].likes + 1,
  };

  return response.status(200).json({ likes: repositories[hasRepository].likes });
});

module.exports = app;
