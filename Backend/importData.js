const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const Activity = require("./models/Activity");

mongoose.connect("mongodb://127.0.0.1:27017/teacher-dashboard")
  .then(() => console.log("MongoDB Connected for Import"))
  .catch(err => console.log(err));

const results = [];

fs.createReadStream("Savra_Teacher Data Set.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    try {

      const formattedData = results.map(row => {

        let rawType = row.Activity_type?.toLowerCase().trim();
        let type = "lesson"; 

        if (rawType.includes("quiz")) type = "quiz";
        else if (rawType.includes("question") || rawType.includes("assessment")) type = "assessment";
        else if (rawType.includes("lesson")) type = "lesson";

        return {
          teacher_id: row.Teacher_id,
          teacher_name: row.Teacher_name,
          activity_type: type,
          subject: row.Subject,
          class: row.Grade,
          created_at: new Date(row.Created_at)
        };
      });

      await Activity.deleteMany({});
      await Activity.insertMany(formattedData);

      console.log("Data Imported Successfully 🚀");
      process.exit();

    } catch (err) {
      console.error("Import Error:", err);
      process.exit(1);
    }
  });