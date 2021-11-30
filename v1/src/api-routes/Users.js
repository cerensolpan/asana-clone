//validate middleware
const validate =require("../middlewares/validate")
//validations
const schemas = require("../validations/Users")
const express = require("express");
const {create,index,login} = require("../controllers/Users")
const router = express.Router();

router.get("/",index);
router.post("/",create);
router.route("/").post(validate(schemas.createValidation),create);
router.route("/login").post(validate(schemas.loginValidation),login);

module.exports = router