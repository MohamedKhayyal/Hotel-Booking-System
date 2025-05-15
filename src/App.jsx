import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import Rooms from "./pages/rooms/Rooms";

export default function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/rooms" element={<Rooms />} />
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  );
}
