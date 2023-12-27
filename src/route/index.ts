const express = require("express");
const router = express.Router();
import authRoutes from "./auth";

router.use("/auth", authRoutes);
module.exports = router;
