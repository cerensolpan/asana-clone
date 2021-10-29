const Project = require("../models/Projects")
const insert = (projectData)=>{
    const projects = Project(projectData);
    return projects.save();
}

const list = () => {
    Project.find({});
}
module.exports = {
    insert,
    list
}