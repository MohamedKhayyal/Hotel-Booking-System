import { useEffect, useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { assets } from "../../assets/assets";

export default function Book() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(data);
  }, []);

  const handleDelete = (idx) => {
    const updated = bookings.filter((_, i) => i !== idx);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <>
      <SignedIn>
        {bookings.length === 0 ? (
          <div className="p-8 text-lg">No bookings yet.</div>
        ) : (
          <div className="pt-28 md:pt-35 px-2 sm:px-4 md:px-16 lg:px-24 xl:px-32">
            <h2 className="text-3xl font-playfair font-bold mb-2">
              My Bookings
            </h2>
            <div className="text-gray-500 mb-8">
              Easily manage your past, current, and upcoming hotel reservations
              in one place. Plan your trips seamlessly with just a few clicks
            </div>
            <div className="w-full border-b mb-3 font-semibold text-gray-700 text-xs sm:text-sm hidden sm:flex">
              <div className="w-2/5 pl-2 mb-3">Hotels</div>
              <div className="w-2/5 mb-3">Date & Timings</div>
              <div className="w-1/6 mb-3">Payment</div>
              <div className="w-1/12 mb-3 text-center">Delete</div>
            </div>
            <div className="space-y-6">
              {bookings.map((b, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row border-b pb-6 pt-4 items-start sm:items-center gap-4 sm:gap-0"
                >
                  <div className="w-full sm:w-2/5 flex gap-4 items-center">
                    <img
                      src={b.image}
                      alt={b.hotelName}
                      className="w-28 h-20 sm:w-32 sm:h-24 object-cover rounded"
                    />
                    <div>
                      <div className="font-semibold text-base sm:text-lg">
                        {b.hotelName}{" "}
                        <span className="text-sm sm:text-base text-gray-500">
                          ({b.roomType})
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm gap-1">
                        <img src={assets.heartIcon} className="w-4 h-4" />
                        {b.address}
                      </div>
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm gap-1 mt-1">
                        <img src={assets.guestsIcon} className="w-4 h-4" />
                        Guests: {b.guests}
                      </div>
                      <div className="font-bold mt-2 text-sm sm:text-base">
                        Total: ${b.price}
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-2/5 flex flex-col gap-1 text-gray-600 text-xs sm:text-sm">
                    <div>
                      <span className="font-semibold">Check-In:</span>{" "}
                      <span>{b.checkIn}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Check-Out:</span>{" "}
                      <span>{b.checkOut}</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/6 flex flex-col items-start gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="text-green-600 font-medium">Paid</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/12 flex justify-center mt-2 sm:mt-0">
                    <button
                      onClick={() => handleDelete(idx)}
                      className="text-red-500 hover:text-red-700 text-xs sm:text-base"
                      title="Delete booking"
                    >
                      <img
                        src={assets.closeIcon}
                        alt="Delete"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
