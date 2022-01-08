//validate middleware
const validate =require("../middlewares/validate")
//validations
const schemas = require("../validations/Users")
const express = require("express");
const UserController = require("../controllers/User")
const router = express.Router();
const authenticateToken = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");

router.get("/",UserController.index);
router.post("/",UserController.create);
router.route("/").post(validate(schemas.createValidation),UserController.create);
router.route("/").patch(authenticateToken,validate(schemas.updateValidation),UserController.update);
router.route("/login").post(validate(schemas.loginValidation),UserController.login);
router.route("/projects").get(authenticateToken,UserController.projectList);
router.route("/reset-password").post( validate(schemas.resetPasswordValidation),UserController.resetPassword);
router.route("/:id").delete(idChecker(),authenticateToken,UserController.deleteUser);
router.route("/change-password").post(authenticateToken,validate(schemas.changePasswordValidation),UserController.changePassword);
router.route("/update-profile-image").post(authenticateToken,UserController.updateProfileImage);

module.exports = router