import "font-awesome/css/font-awesome.min.css";
import "./assets/css/app.css";
import DashboardPage from "./pages/DashboardPage";
import TypographyPage from "./pages/TypographyPage";
import LoginPage from "./pages/auth/LoginPage";
import ResetPassword from "./pages/auth/ResetPassword";
import ProfilePage from "./pages/profile/ProfilePage";
import ChangePasswordPage from "./pages/profile/ChangePasswordPage";
import UserPreferencesPage from "./pages/profile/UserPreferencesPage";
import AdminBlankPage from "./pages/AdminBlankPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { UserProvider } from "./globalStorage/UserProvider";
import AllUserData from "./pages/AllUserData";
import AllbookingData from "./pages/AllbookingData";
import AllYachtData from "./pages/AllYachtData";


function App() {
  return (
    <Router>
      <ToastProvider>
        <UserProvider>
          <Routes>
            <Route exact path="/Dashboard" element={<DashboardPage />} />
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route
              exact
              path="/change-password"
              element={<ChangePasswordPage />}
            />
            <Route
              exact
              path="/preferences"
              element={<UserPreferencesPage />}
            />
            <Route exact path="/typography" element={<TypographyPage />} />
            <Route exact path="/blank-page" element={<AdminBlankPage />} />
            <Route exact path="/user-details" element={<AllUserData />} />
            <Route exact path="/yacht-details" element={<AllYachtData
            />} />
            <Route exact path="/booking-details" element={<AllbookingData
            />}



            />

          </Routes>
        </UserProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
