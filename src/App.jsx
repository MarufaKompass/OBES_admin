import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import UserAnswerLists from "./pages/ansList/UserAnswerLists";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
       <Route path="/dashboard/questionary/answerDetails/:qansjson_id" element={<UserAnswerLists />} />
    </Routes>
  );
}

export default App;
