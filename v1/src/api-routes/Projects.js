//validate middleware
const validate =require("../middlewares/validate")
//validations
const schemas = require("../validations/Projects")
const express = require("express");
const {create,index} = require("../controllers/Projects");
const authenticateToken = require("../middlewares/authenticate");
const router = express.Router();

router.route("/").get(authenticateToken,index);
// router.post("/",create);
router.route("/").post(authenticateToken,validate(schemas.createValidation),create);

module.exports = router