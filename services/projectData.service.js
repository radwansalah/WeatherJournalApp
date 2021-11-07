projectData = {};

function getProjectData(request, response) {
  response.send(projectData);
}

function postProjectData(request, response) {
  projectData["temp"] = request.body.temp;
  projectData["date"] = request.body.date;
  projectData["content"] = request.body.content;

  response.send(projectData);
}

exports.getProjectData = getProjectData;
exports.postProjectData = postProjectData;
