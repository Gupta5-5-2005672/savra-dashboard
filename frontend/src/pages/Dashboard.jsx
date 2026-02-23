import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WeeklyChart from "../components/WeeklyChart";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/overview")
      .then(res => setData(res.data));
  }, []);

  const totalLessons = data.reduce((sum, t) => sum + t.lessons, 0);
  const totalQuizzes = data.reduce((sum, t) => sum + t.quizzes, 0);
  const totalAssessments = data.reduce((sum, t) => sum + t.assessments, 0);

  const overallChartData = [
    { date: "Lessons", count: totalLessons },
    { date: "Quizzes", count: totalQuizzes },
    { date: "Assessments", count: totalAssessments }
  ];

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>SAVRA</h2>
        <ul>
          <li>Dashboard</li>
          <li>Teachers</li>
          <li>Classrooms</li>
          <li>Reports</li>
        </ul>
      </div>

      <div className="main">
        <div className="topbar">
          <h1>Admin Companion</h1>
          <input placeholder="Search..." />
        </div>

        <div className="insightGrid">
          <div className="insightCard">
            <h4>Active Teachers</h4>
            <h2>{data.length}</h2>
          </div>
          <div className="insightCard">
            <h4>Total Lessons</h4>
            <h2>{totalLessons}</h2>
          </div>
          <div className="insightCard">
            <h4>Total Quizzes</h4>
            <h2>{totalQuizzes}</h2>
          </div>
          <div className="insightCard">
            <h4>Total Assessments</h4>
            <h2>{totalAssessments}</h2>
          </div>
        </div>

        <div className="chartSection">
          <div className="chartCard">
            <h3>Overall Activity</h3>
            <WeeklyChart data={overallChartData} />
          </div>
        </div>

        <div className="cardGrid">
          {data.map(t => (
            <div className="card" key={t._id}>
              <h3>{t.teacher_name}</h3>
              <button onClick={() => navigate(`/teacher/${t._id}`)}>
                View Analysis
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}