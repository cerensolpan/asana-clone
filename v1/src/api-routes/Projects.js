//validate middleware
const validate =require("../middlewares/validate")
//validations
const schemas = require("../validations/Projects")
const express = require("express");
const ProjectController = require("../controllers/Project");
const authenticateToken = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");
const router = express.Router();

router.route("/").get(authenticateToken,ProjectController.index);
// router.post("/",create);
router.route("/").post(authenticateToken,validate(schemas.createValidation),ProjectController.create);
router.route("/:id").patch(idChecker(),authenticateToken,validate(schemas.updateValidation),ProjectController.update);
router.route("/:id").delete(idChecker(),authenticateToken,ProjectController.deleteProject);

module.exports = router