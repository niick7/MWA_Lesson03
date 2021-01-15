const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: Number
})

const studentSchema = mongoose.Schema({
  name: String,
  gpa: Number,
  addresses: [addressSchema]
})

mongoose.model("Student", studentSchema, "Students");