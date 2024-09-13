import React from "react";

function SignUpForm({ onChange, onSubmit, state }) {
  return (
    <div
      className={`w-full md:absolute md:w-1/2 md:left-0 md:top-0 p-4 md:p-8 transition-all duration-500 ease-in-out transform ${
        state.type === "signUp" ? "md:translate-x-0 md:opacity-100 md:z-10" : "md:-translate-x-full md:opacity-0 md:z-0"
      }`}
    >
      <form onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 hidden md:block">Create Account</h1>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={onChange}
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={onChange}
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={onChange}
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          className="w-full py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;