import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WeeklyChart from "../components/WeeklyChart";

export default function TeacherPage() {
  const { id } = useParams();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/teacher/${id}`)
      .then((res) => {
        setActivities(res.data.activities);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const lessons = activities.filter(a => a.activity_type === "lesson").length;
  const quizzes = activities.filter(a => a.activity_type === "quiz").length;
  const assessments = activities.filter(a => a.activity_type === "assessment").length;

  const teacherChartData = [
    { date: "Lessons", count: lessons },
    { date: "Quizzes", count: quizzes },
    { date: "Assessments", count: assessments }
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h2>Teacher Analysis</h2>

    
      <div style={{ margin: "30px 0", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <h3>Activity Breakdown</h3>
        <WeeklyChart data={teacherChartData} />
      </div>

    
      <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <table border="1" cellPadding="8" width="100%">
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Name</th>
              <th>Activity</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a, index) => (
              <tr key={index}>
                <td>{a.teacher_id}</td>
                <td>{a.teacher_name}</td>
                <td>{a.activity_type}</td>
                <td>{a.subject}</td>
                <td>{a.class}</td>
                <td>{new Date(a.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}