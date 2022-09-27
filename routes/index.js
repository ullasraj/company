const express = require("express");
const { employeRoute, projectRoute } = require("../modules");
const router = express.Router();

router.use("/employe", employeRoute);
router.use("/project", projectRoute);
module.exports = router;
