const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.getStudents = function(req, res) {
  Student.find().exec(function(err, students) {
    const response = {
      status: 200,
      message: students
    }

    if (err) {
      response.status = 500;
      response.message = {message: err};
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.getStudent = function(req, res) {
  const studentId = req.params.studentId;

  Student.findById(studentId).exec(function(err, student) {
    const response = {
      status: 200,
      message: student
    }
    if (err) {
      response.status = 500;
      response.message = {message: err};
    } else {
      if (!student) {
        response.status = 404;
        response.message = {message: "Student ID not found"};
      }
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.getAddresses = function(req, res) {
  const studentId = req.params.studentId;

  Student.findById(studentId).select("addresses").exec(function(err, student) {
    const addresses = student.addresses;
    const response = {
      status: 200,
      message: addresses
    }
    if (err) {
      response.status = 500;
      response.message = {message: err};
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.getAddress = function(req, res) {
  const studentId = req.params.studentId;
  const addressId = req.params.addressId;

  Student.findById(studentId).select("addresses").exec(function(err, student) {
    const address = student.addresses.id(addressId);

    const response = {
      status: 200,
      message: address
    }
    if (err) {
      response.status = 500;
      response.message = {message: err};
    }
    res.status(response.status).json(response.message);
  });
}