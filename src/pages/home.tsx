import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Login from "./login.tsx";
import Dashboard from "../component/dashboard/dashboard.tsx";

// Function to check token expiration
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
    return payload.exp * 1000 < Date.now(); // Check if expired
  } catch (error) {
    return true;
  }
};

function Home() {
  const [logged, setLogged] = useState<boolean | null>(null);

  useEffect(() => {
    const existingLogin = sessionStorage.getItem("login");

    if (!existingLogin) {
      setLogged(false);
      return;
    }

    try {
      const login = JSON.parse(existingLogin);
      const isTokenValid = login?.token && !isTokenExpired(login.token);
      
      // Prevent unnecessary updates
      if (logged !== isTokenValid) {
        setLogged(isTokenValid);
      }
    } catch (error) {
      setLogged(false);
    }
  }, [logged]); // Empty dependency array to run only once

  if (logged === null)
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-40 backdrop-blur-sm z-50">
        <div className="p-4 bg-white rounded-full shadow-lg">
          <img src="assets/loading.gif" className="w-20 h-20" alt="Loading..." />
        </div>
      </div>
    );

  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={logged ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={logged ? <Dashboard /> : <Navigate to="/sign-in" />} />
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </Router>
  );
}

export default Home;
