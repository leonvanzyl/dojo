import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";

// Components
import NavBar from "./components/navbar/NavBar";
import Sidebar from "./components/sidebar/Sidebar";
import OnlineUsers from "./components/onlineusers/OnlineUsers";

// Hooks
import { useAuthContext } from "./hooks/useAuthContext";

function Loading() {
  return <div className="container">Loading..</div>;
}

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {!authIsReady && <Loading />}
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <NavBar />
            <Routes>
              <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/project/:id"
                element={user ? <Project /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
