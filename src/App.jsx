import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/sign in/SignIn";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route element={<SignIn />} index />
        <Route element={<Login />} path="/login" />
      </Routes>
    </div>
  );
}
