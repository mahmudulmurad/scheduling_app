const express = require("express");
const router = express.Router();

import authRoutes from "./Auth";
import employeeRoutes from './Employee'
import shiftRoutes from './Shift'


router.use("/auth", authRoutes);
router.use("/employee", employeeRoutes)
router.use("/shift", shiftRoutes)



module.exports = router;
