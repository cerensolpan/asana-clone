const BaseService = require ("./BaseService");
const BaseModel = require("../models/Users");

class Users extends BaseService {
    constructor(){
        super(BaseModel);
    }
}

module.exports = Users;