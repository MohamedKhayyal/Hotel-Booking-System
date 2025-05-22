import { useState } from "react";
import { roomsDummyData } from "../assets/assets";
import { useParams } from "react-router-dom";

export default function DetailImage() {
  const { id } = useParams();
  const room = roomsDummyData.find((r) => r._id === id);
  const [activeImg, setActiveImg] = useState(0);
  return (
    <div className="flex flex-col lg:flex-row mt-6 gap-6">
      <div className="lg:w-1/2 w-full">
        <img
          src={room.images[activeImg]}
          alt="Room"
          className="w-full rounded-xl shadow-lg object-cover"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
        {room.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Room ${idx + 1}`}
            className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
              activeImg === idx
                ? "border-orange-500 border-3"
                : "border-transparent"
            }`}
            onClick={() => setActiveImg(idx)}
          />
        ))}
      </div>
    </div>
  );
}
