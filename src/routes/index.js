const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { privateRoute } = require("../config/passport");
const ApiController = require("../controller/ApiController");

router.post("/register", ApiController.register);
router.post("/login", ApiController.login);
router.get("/list", privateRoute, ApiController.list);
module.exports = router;
