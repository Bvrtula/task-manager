import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Tasks from "@/pages/Tasks";
import Register from "@/pages/Register";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/register" element={<Register />} />
        {/* // <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
