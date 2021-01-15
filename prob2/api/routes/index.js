const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/students_controller");

router.route("/students").get(studentsController.getStudents);
router.route("/students/:studentId").get(studentsController.getStudent);
router.route("/students/:studentId/addresses").get(studentsController.getAddresses);
router.route("/students/:studentId/addresses/:addressId").get(studentsController.getAddress);

module.exports = router;