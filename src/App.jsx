import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authservice from "./appwrite/Auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authservice.getcurrentUser();
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        dispatch(logout());
        console.error("⚠️ Authentication check failed:", err);
      } finally {
        setloading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return <div className="bg-gray-400 min-h-screen">Loading...</div>;
  }

  return (
    <div className='"w-full min-h-screen bg-gray-400 flex flex-wrap content-between '>
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
