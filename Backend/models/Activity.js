const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  teacher_id: String,
  teacher_name: String,
  activity_type: {
    type: String,
    enum: ["lesson", "quiz", "assessment"]
  },
  subject: String,
  class: String,
  created_at: Date
});

ActivitySchema.index(
  { teacher_id: 1, activity_type: 1, subject: 1, class: 1, created_at: 1 },
  { unique: true }
);

module.exports = mongoose.model("Activity", ActivitySchema);