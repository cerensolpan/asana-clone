//validate middleware
const validate =require("../middlewares/validate")
//validations
const schemas = require("../validations/Tasks")
const express = require("express");
const {create,update,deleteTask,makeComment} = require("../controllers/Tasks");
const authenticateToken = require("../middlewares/authenticate");
const router = express.Router();

router.route("/").post(authenticateToken,validate(schemas.createValidation),create);
router.route("/:id").patch(authenticateToken,validate(schemas.updateValidation),update);
router.route("/:id").delete(authenticateToken,deleteTask);
router.route("/:id/make-comment").post(authenticateToken,validate(schemas.updateValidation),makeComment);

module.exports = router