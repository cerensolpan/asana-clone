let BaseModel = null;
class BaseService {
    //Bir bilgi göndermek istiyorsak - app.js=> const baseService = new BaseService("deneme"); 
    // constructor(Model){
    //     console.log('Model :>> ', Model); // deneme
    // }
    constructor(model) {
        BaseModel = model;
    }
    list(where){
        return BaseModel?.find(where || {})
    }
    create(data){}
    read(where){}
    update(id,data){}
    delete(id){}
}

module.exports = BaseService;