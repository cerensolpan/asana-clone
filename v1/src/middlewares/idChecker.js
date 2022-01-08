const ApiError = require("../errors/ApiError");
const httpStatus = require("http-status");

const idChecker = (field) => (req,res,next) => {
    const idField = field || "id";
    if(req?.params[idField]?.id?.match(/^[0-9a-fA-F]{24}$/)){
        next(new ApiError("Lütfen geçerli bir ID bilgisi giriniz", httpStatus.BAD_REQUEST));
        return;
    }
    next();
}

module.exports = idChecker;