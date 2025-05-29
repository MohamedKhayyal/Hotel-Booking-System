import { assets, cities, roomsDummyData } from "../assets/assets";
import heroImage from "../assets/heroImage.png";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const destinationRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const guestsRef = useRef();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const [minCheckOut, setMinCheckOut] = useState(today);

  function handleCheckInChange(e) {
    setMinCheckOut(e.target.value || today);
  }

  function handleSearch(e) {
    e.preventDefault();
    const city = destinationRef.current.value;
    const checkIn = checkInRef.current.value;
    const checkOut = checkOutRef.current.value;
    const guests = guestsRef.current.value;
    const room = roomsDummyData.find(
      (r) => r.city.toLowerCase() === city.toLowerCase()
    );
    if (!room) {
      alert("No hotel found for this destination.");
      return;
    }

    const booking = {
      hotelName: room.hotel.name,
      roomType: room.roomType,
      address: room.hotel.address,
      price: room.pricePerNight,
      checkIn,
      checkOut,
      guests,
      image: room.images[0],
    };

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    navigate("/my-bookings");
  }

  return (
    <div
      className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">
        The Ultimate Hotel Experience
      </p>
      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
        Discover Your Perfect Gateway Destination
      </h1>
      <p className="max-w-130 mt-2 text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today
      </p>
      <form
        className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto"
        onSubmit={handleSearch}
      >
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.locationIcon} className="h-4" />

            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            ref={destinationRef}
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            ref={checkInRef}
            min={today}
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            onChange={handleCheckInChange}
            required
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            ref={checkOutRef}
            min={minCheckOut}
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            required
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            ref={guestsRef}
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
            placeholder="0"
            required
          />
        </div>

        <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
          <img src={assets.searchIcon} className="h-7" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
