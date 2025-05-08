import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        await updateProfile(user, { displayName: fullName });

        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fullName: fullName,
          firstName: firstName,
          lastName: lastName,
        });
        console.log("success");
        toast.success("User Registered successfully!", {
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/login"); // Corrected the path
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div
      style={{ height: "100vh", placeContent: "center", placeItems: "center" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          Sign Up
        </h2>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.125 13.125a4.375 4.375 0 0 1 8.75 0M10 4.375a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"
              stroke="#6B7280"
              stroke-opacity=".6"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input
            onChange={(e) => setFullName(e.target.value)}
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
              stroke="#6B7280"
              stroke-opacity=".6"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
              stroke="#6B7280"
              stroke-opacity=".6"
              stroke-width="1.3"
              stroke-linecap="round"
            />
          </svg>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none bg-transparent py-2.5"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
              stroke="#6B7280"
              stroke-opacity=".6"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
              stroke="#6B7280"
              stroke-opacity=".6"
              stroke-width="1.3"
              stroke-linecap="round"
            />
          </svg>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none bg-transparent py-2.5"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
        >
          Create Account
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
