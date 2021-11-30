const Project = require("../models/Projects")
const insert = (data)=>{
    const projects = Project(data);
    return projects.save();
}

const list = () => {
   return Project.find({});
}
module.exports = {
    insert,
    list
}