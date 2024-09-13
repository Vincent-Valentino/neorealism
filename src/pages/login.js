import React, { useState } from "react";
import LoginForm from "../components/login";
import SignUpForm from "../components/signup";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [type, setType] = useState("signIn");
  const [state, setState] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState("");

  const handleOnClick = (text) => setType(text);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    
    const url = type === "signUp"
      ? "https://neorealism-be.vercel.app/api/auth/signup"
      : "https://neorealism-be.vercel.app/api/auth/login";

    const body = type === "signUp" 
      ? { username: state.username, email: state.email, password: state.password } 
      : { username: state.username, password: state.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setMessage(`Successfully ${type === "signUp" ? "registered" : "logged in"}`);
        navigate("/home");
      } else {
        setMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setMessage("An error occurred during submission.");
    }
  };

  return (
    <div className="min-h-screen bg-onyx flex items-center justify-center p-4">
      {/* Mobile layout */}
      <div className="w-full max-w-md mx-auto md:hidden">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-center mb-4">
              <button
                className={`mx-2 px-4 py-2 font-bold ${type === "signIn" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"}`}
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
              <button
                className={`mx-2 px-4 py-2 font-bold ${type === "signUp" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"}`}
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
            {type === "signIn" ? (
              <LoginForm onChange={handleChange} onSubmit={handleOnSubmit} state={{ ...state, type }} />
            ) : (
              <SignUpForm onChange={handleChange} onSubmit={handleOnSubmit} state={{ ...state, type }} />
            )}
          </div>
        </div>
      </div>

      {/* Tablet and Desktop layout */}
      <div className="hidden md:block relative w-full max-w-4xl mx-auto">
        <div className="container relative w-full h-[500px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex">
          <SignUpForm
            onChange={handleChange}
            onSubmit={handleOnSubmit}
            state={{ ...state, type }}
          />
          <LoginForm
            onChange={handleChange}
            onSubmit={handleOnSubmit}
            state={{ ...state, type }}
          />
          <div
            className={`absolute w-1/2 h-full top-0 transition-transform transform duration-500 ease-in-out bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 flex items-center justify-center ${
              type === "signUp" ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">
                {type === "signUp" ? "Welcome Back!" : "Hello, Friend!"}
              </h1>
              <p className="mb-6">
                {type === "signUp"
                  ? "To keep connected with us please login with your personal info"
                  : "Enter your personal details and start your journey with us"}
              </p>
              <button
                className="py-2 px-6 bg-white text-red-500 font-bold rounded-lg hover:bg-gray-200 transition duration-300"
                onClick={() => handleOnClick(type === "signUp" ? "signIn" : "signUp")}
              >
                {type === "signUp" ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <p className="text-center mt-4 text-red-500">
          {message}
        </p>
      )}
    </div>
  );
}