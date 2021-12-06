const Project = require("../models/Projects")
const insert = (data)=>{
    const projects = Project(data);
    return projects.save();
}

const modify = () => {
    return Project.find({}).populate({
        path: "user_id",
        select:"full_name email"
    });
}

const list = (data,id) => {
   return Project.findById(id).then(project=>{
       project.name = data?.name
       return project.save();
   })
}
module.exports = {
    insert,
    modify,
    list
}