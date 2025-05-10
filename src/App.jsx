import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";

export default function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route
          index
          path="/"
          element={
            <div className="min-h-[70vh]">
              <Home />
            </div>
          }
        />
      </Routes>
    </div>
  );
}
