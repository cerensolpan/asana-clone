const Project = require("../models/Projects")
const insert = (data)=>{
    const projects = Project(data);
    return projects.save();
}

const list = (where) => {
    return Project.find(where || {}).populate({
        path: "user_id",
        select:"full_name email"
    });
}

const modify = (data,id) => {
    return Project.findByIdAndUpdate(id,data,{new:true}); 
//     return Project.findById(id).then(project=>{
//        project.name = data?.name
//        return project.save();
//    })
}
module.exports = {  
    insert,
    list,
    modify
}