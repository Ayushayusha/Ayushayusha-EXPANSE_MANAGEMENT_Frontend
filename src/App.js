import React from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import { getUser, clearAuth } from "./utils/auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "#2563EB", borderRadius: 8 }}></div>
          <h2 style={{ margin: 0 }}>Expense Tracker</h2>
        </div>

        <div className="nav">
          {user ? (
            <>
              {/*Show Dashboard link only if not on login/signup */}
              {location.pathname === "/" && <Link to="/" className="nav-link"  >Dashboard</Link>}
              <span style={{ marginLeft: 8 }}>{user.name || user.email}</span>
              <button onClick={logout} className="btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" >Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
