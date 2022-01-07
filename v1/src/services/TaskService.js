const BaseService = require ("./BaseService");
const BaseModel = require("../models/Tasks");

class TaskService extends BaseService {
    constructor(){
        super(BaseModel);
    }
    list(where){
        return BaseModel.find(where || {}).populate({
            path: "user_id",
            select:"full_name email profile_image"
        });
    }
    findOne(where, expand) {
        if(!expand) return Task.findOne(where);
        return this.BaseModel.findOne(where)
        .populate([
        {
            path: "user_id",
            select: "full_name email profile_image"
        },
        {
            path: "comments",
            populate:{
                path: "user_id",
                select: "full_name email profile_image"
            }
        },
        {
            path: "sub_tasks",
            select:"title description isCompleted assigned_to due_date order sub_tasks statuses"
        }])
    }
}

module.exports = new TaskService;