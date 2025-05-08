import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/sign in/SignIn";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <div className="min-h-[70vh]">
              <Home />
            </div>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}
