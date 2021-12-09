//validate middleware
const validate =require("../middlewares/validate")
//validations
const schemas = require("../validations/Users")
const express = require("express");
const {create,index,login, projectList, resetPassword} = require("../controllers/Users")
const router = express.Router();
const authenticateToken = require("../middlewares/authenticate");

router.get("/",index);
router.post("/",create);
router.route("/").post(validate(schemas.createValidation),create);
router.route("/login").post(validate(schemas.loginValidation),login);
router.route("/projects").get(authenticateToken,projectList);
router.route("/reset-password").post( validate(schemas.resetPasswordValidation),resetPassword);

module.exports = router