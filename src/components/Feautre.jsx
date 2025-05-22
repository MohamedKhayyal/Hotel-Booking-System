import { useNavigate } from "react-router-dom";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";

export default function Feautre({ align, font }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <div
        className={`flex flex-col justify-center items-center text-center ${
          align === "left" && "md items-start md:text-left"
        }`}
      >
        <h1 className={` text-4xl md:text-[40px] ${font || "font-playfair"}`}>
          Featured Destination
        </h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
          Discover our handpicked selection of exceptional properties around the
          world, offering unparalleled luxury and unforgettable experiences.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
      <button
        onClick={() => {
          navigate(`/rooms/${room._id}`);
        }}
        className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
      >
        View All Destinations
      </button>
    </div>
  );
}
