import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TeacherPage from "./pages/TeacherPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/teacher/:id" element={<TeacherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;