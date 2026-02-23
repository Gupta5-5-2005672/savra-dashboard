const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  teacher_id: { type: String, required: true, unique: true },
  teacher_name: { type: String, required: true }
});

module.exports = mongoose.model("Teacher", TeacherSchema);