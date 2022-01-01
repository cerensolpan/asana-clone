const Task = require("../models/Tasks")

const findOne = (where) => {
    return Task.findOne(where)
}

const insert = (data)=>{
    return new Task(data).save();
}

const list = (where) => {
    return Task.find(where || {})
    .populate({
        path: "user_id",
        select:"full_name email profile_image"
    })
}

const modify = (data,id) => {
    return Task.findByIdAndUpdate(id,data,{new:true}); 
}

const remove = (id) => {
    return Task.findByIdAndDelete(id); 
}
module.exports = {  
    findOne,
    insert,
    list,
    modify,
    remove
}