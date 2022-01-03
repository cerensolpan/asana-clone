const BaseService = require ("./BaseService")
class Service extends BaseService {
    getService2(){
        console.log('"Service2" :>> ', "Service2");
    }
}


module.exports = Service;