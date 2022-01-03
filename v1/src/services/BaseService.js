class BaseService {
    //Bir bilgi göndermek istiyorsak - app.js=> const baseService = new BaseService("deneme"); 
    constructor(Model){
        console.log('Model :>> ', Model); // deneme
    }
    getService(){
        console.log('"Get Service Method" :>> ', "Get Service Method");
    }
}

module.exports = BaseService;