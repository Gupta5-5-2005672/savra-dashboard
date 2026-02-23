import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TeacherAnalysis() {
  const { id } = useParams();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/teacher/${id}`)
      .then((res) => setActivities(res.data.activities));
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Teacher Activity Details</h2>

      <table border="1" cellPadding="8">
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
  );
}