const { connection } = require('../db/database')
const { createProject, getProjects, getProjectById, updateProject, startProject, pullProject, deleteProject } = require('../service/project')

module.exports = {
    create: createProject,
    get: getProjects,
    getById: getProjectById,
    update: updateProject,
    start: startProject,
    pull: pullProject,
    del: deleteProject
}