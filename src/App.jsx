import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import UserAnswerLists from "./pages/ansList/UserAnswerLists";
import PdfDownload from "./pages/newsletter/PdfDownload";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
       <Route path="/dashboard/questionary/answerDetails/:qansjson_id" element={<UserAnswerLists />} />
       <Route path="/dashboard/newsletter/pdf-viewer" element={<PdfDownload />} />
    </Routes>
  );
}

export default App;
