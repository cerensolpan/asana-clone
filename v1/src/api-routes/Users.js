//validate middleware
const validate =require("../middlewares/validate")
//validations
const schemas = require("../validations/Users")
const express = require("express");
const {create,index,login, projectList, resetPassword, update, deleteUser, changePassword, updateProfileImage} = require("../controllers/Users")
const router = express.Router();
const authenticateToken = require("../middlewares/authenticate");

router.get("/",index);
router.post("/",create);
router.route("/").post(validate(schemas.createValidation),create);
router.route("/").patch(authenticateToken,validate(schemas.updateValidation),update);
router.route("/login").post(validate(schemas.loginValidation),login);
router.route("/projects").get(authenticateToken,projectList);
router.route("/reset-password").post( validate(schemas.resetPasswordValidation),resetPassword);
router.route("/:id").delete(authenticateToken,deleteUser);
router.route("/change-password").post(authenticateToken,validate(schemas.changePasswordValidation),changePassword);
router.route("/update-profile-image").post(authenticateToken,updateProfileImage);

module.exports = router