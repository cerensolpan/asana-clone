//validate middleware
const validate =require("../middlewares/validate")
//validations
const schemas = require("../validations/Projects")
const express = require("express");
const {index,create,update} = require("../controllers/Projects");
const authenticateToken = require("../middlewares/authenticate");
const router = express.Router();

router.route("/").get(authenticateToken,index);
// router.post("/",create);
router.route("/").post(authenticateToken,validate(schemas.createValidation),create);
router.route("/:id").patch(authenticateToken,validate(schemas.updateValidation),update);

module.exports = router