const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

router.get("/overview", async (req, res) => {
  const data = await Activity.aggregate([
    {
      $group: {
        _id: "$teacher_id",
        teacher_name: { $first: "$teacher_name" },
        lessons: {
          $sum: { $cond: [{ $eq: ["$activity_type", "lesson"] }, 1, 0] }
        },
        quizzes: {
          $sum: { $cond: [{ $eq: ["$activity_type", "quiz"] }, 1, 0] }
        },
        assessments: {
          $sum: { $cond: [{ $eq: ["$activity_type", "assessment"] }, 1, 0] }
        }
      }
    }
  ]);

  res.json(data);
});


router.get("/teacher/:id", async (req, res) => {
  const activities = await Activity.find({ teacher_id: req.params.id });

  const weeklyMap = {};

  activities.forEach(a => {
    const week = new Date(a.created_at).toISOString().slice(0,10);
    weeklyMap[week] = (weeklyMap[week] || 0) + 1;
  });

  const trend = Object.keys(weeklyMap).map(date => ({
    date,
    count: weeklyMap[date]
  }));

  res.json({ activities, trend });
});

module.exports = router;