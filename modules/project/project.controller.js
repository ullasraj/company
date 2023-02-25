const db = require("../../models");
const projectService = require("./project.service");

exports.register = async (req, res, next) => {
  const { body } = req;
  const response = await projectService.register(body);
  res.send(response).status(200);
};

exports.getAll = async (req, res, next) => {
  console.log("hi");
  const results = await projectService.getAll();
  res.send(results).status(200);
};

exports.project = async (req, res, next) => {
  const { id } = req.params;
  const results = await projectService.getProject(id);
  if (results) {
    res.send(results).status(200);
  } else {
    res.send("results not found").status(404);
  }
};
