const BaseService = require ("./BaseService");
const BaseModel = require("../models/Projects");

class Projects extends BaseService {
    constructor(){
        super(BaseModel);
    }
}

module.exports = Projects;