import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  roomsDummyData,
  facilityIcons,
  assets,
  roomCommonData,
  exclusiveOffers,
} from "../../assets/assets";
import DetailImage from "../../components/DetailImage";
import { toast } from "react-toastify";

export default function RoomDetail() {
  const { id } = useParams();
  const room = roomsDummyData.find((r) => r._id === id);
  const offer =
    exclusiveOffers.find(
      (o) =>
        room.roomType &&
        o.title.toLowerCase().includes(room.roomType.toLowerCase())
    ) || exclusiveOffers[0];
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const guestsRef = useRef();
  const navigate = useNavigate();
  const [minCheckOut, setMinCheckOut] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  if (!room) return <div>Room not found.</div>;

  function handleCheckAvailability(e) {
    e.preventDefault();
    const booking = {
      roomId: room._id,
      hotelName: room.hotel.name,
      roomType: room.roomType,
      address: room.hotel.address,
      price: room.pricePerNight,
      checkIn: checkInRef.current.value,
      checkOut: checkOutRef.current.value,
      guests: guestsRef.current.value,
      image: room.images?.[0] || "",
    };
    const bookings = JSON.parse(localStorage.getItem("bookings") || []);
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    toast.success("The hotel has been booked", {
      position: "top-center",
    });
    setTimeout(() => {
      navigate("/my-bookings");
    }, 1000);
  }

  function handleCheckInChange(e) {
    const selected = e.target.value;
    setMinCheckOut(selected);
  }

  return (
    <div className=" pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-playfair font-bold mb-2">
            {room.hotel.name}
            <span className="text-lg font-normal text-gray-600 ml-2">
              ({room.roomType})
            </span>
            <span className="ml-2 px-3 py-1 bg-orange-500 text-white text-xs rounded-full align-middle">
              {offer.priceOff}% OFF
            </span>
          </h1>
          <div className="flex items-center gap-2 mb-2">
            <img src={assets.starIconFilled} alt="star" className="w-5 h-5" />
            <span className="font-semibold text-lg">4.0</span>
            <span className="text-gray-600 text-base">200+ reviews</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <img src={assets.locationIcon} alt="location" className="w-5 h-5" />
            <span>{room.hotel.address}</span>
          </div>
        </div>
        <div className="text-2xl font-bold font-playfair text-right">
          ${room.pricePerNight}
          <span className="text-lg font-normal text-gray-700">/night</span>
        </div>
      </div>

      <DetailImage />

      <div className="mt-10">
        <h2 className="text-2xl font-playfair font-semibold mb-4">
          Experience Luxury Like Never Before
        </h2>
        <div className="flex flex-wrap gap-4 mb-8">
          {room.amenities.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 text-base font-medium"
            >
              <img src={facilityIcons[item]} alt={item} className="w-6 h-6" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <form
        className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
        onSubmit={handleCheckAvailability}
      >
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Check-In
            </label>
            <input
              ref={checkInRef}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="border rounded px-3 py-2 w-full"
              required
              onChange={handleCheckInChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Check-Out
            </label>
            <input
              ref={checkOutRef}
              type="date"
              min={minCheckOut}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Guests
            </label>
            <input
              ref={guestsRef}
              type="number"
              min={1}
              defaultValue={1}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
            >
              Check Availability
            </button>
          </div>
        </div>
      </form>

      <div className="mt-25 space-y-4">
        {roomCommonData.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 mb-6">
            <img src={item.icon} alt={item.title} className="w-7 h-7 mt-1" />
            <div>
              <div className="font-semibold text-lg">{item.title}</div>
              <div className="text-gray-600">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
