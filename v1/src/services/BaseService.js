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
        return BaseModel?.find(where || {});
    }
    create(data){
        return new BaseModel(data).save();
    }
    read(where){}
    update(id,data){
        return BaseModel.findByIdAndUpdate(id,data,{new:true}); 
    }
    delete(id){
        return BaseModel.findByIdAndDelete(id);
    }
}

module.exports = BaseService;