import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import UserAnswerLists from "./pages/ansList/UserAnswerLists";
import ForgotPassword from "./constant/forgotPassword/ForgotPassword";
import PrivateRoutes from "./components/privateRoute/PrivateRoute";
import Otp from "./constant/forgotPassword/Otp";
import ChangedPassword from "./constant/forgotPassword/ChangedPassword";


function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
       <Route path="/dashboard/questionary/answerDetails/:qansjson_id" element={<PrivateRoutes> <UserAnswerLists /> </PrivateRoutes>} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/otp" element={<Otp />} />
       <Route path="/changed-password" element={<ChangedPassword />} />
       
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
