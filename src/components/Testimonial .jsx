import { assets, testimonials } from "../assets/assets";

export default function Testimonial({ align, font, rating = 4 }) {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
      <div
        className={`flex flex-col justify-center items-center text-center ${
          align === "left" && "md items-start md:text-left"
        }`}
      >
        <h1 className={` text-4xl md:text-[40px] ${font || "font-playfair"}`}>
          What Our Guests Say
        </h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
          Discover why discerning travelers consistently choose QuickStay for
          their exclusive and luxurious accommodations around the world.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-6 mt-20">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill("")
                .map((_, index) => (
                  <img
                    src={
                      rating > index
                        ? assets.starIconFilled
                        : assets.starIconOutlined
                    }
                    className="h-4.5 w-4.5"
                  />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4">
              "{testimonial.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
