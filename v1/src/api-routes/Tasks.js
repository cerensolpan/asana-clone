//validate middleware
const validate =require("../middlewares/validate")
//validations
const schemas = require("../validations/Tasks")
const express = require("express");
const {index,create,update,deleteTask} = require("../controllers/Tasks");
const authenticateToken = require("../middlewares/authenticate");
const router = express.Router();

router.route("/").post(authenticateToken,validate(schemas.createValidation),create);
router.route("/:id").patch(authenticateToken,validate(schemas.updateValidation),update);
router.route("/:id").delete(authenticateToken,deleteTask);

module.exports = router