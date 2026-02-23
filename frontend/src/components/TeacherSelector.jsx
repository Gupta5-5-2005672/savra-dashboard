import React from "react";

const TeacherSelector = ({ teachers, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select Teacher</option>
      {teachers.map((teacher) => (
        <option key={teacher.teacher_id} value={teacher.teacher_id}>
          {teacher.teacher_name}
        </option>
      ))}
    </select>
  );
};

export default TeacherSelector;