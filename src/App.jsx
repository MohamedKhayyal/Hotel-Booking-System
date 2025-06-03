import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import Rooms from "./pages/rooms/Rooms";
import RoomDetail from "./pages/details/RoomDetail";
import Book from "./pages/booking/Book";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="min-h-[70vh]">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/my-bookings" element={<Book />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
