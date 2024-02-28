import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="sm:max-w-lg mx-auto max-h-96 flex justify-between items-center flex-col p-1">
      <h1 className="text-center text-slate-600 my-3 font-semibold text-2xl">
        Sign Up
      </h1>
      <form action="" className="w-50 max-w-lg p-3">
        <input
          type="text"
          placeholder="Username"
          id="Username"
          className="p-3 rounded-md w-full my-2 "
        />
        <input
          type="text"
          placeholder="Email"
          id="Email"
          className="p-3 rounded-md w-full my-2 "
        />
        <input
          type="password"
          placeholder="Password"
          id="Password"
          className="p-3 rounded-md w-full my-2 "
        />
        <button className="bg-slate-700 text-white hover:opacity-95 cursor-pointer w-full p-3 my-2 rounded-md disabled:opacity-80">
          SIGN UP
        </button>
        <button className="bg-red-700 text-white hover:opacity-95 cursor-pointer w-full p-3 my-2 rounded-md disabled:opacity-80">
          CONTINUE WITH GOOGLE
        </button>
      </form>
      <p>
        Have an account?{" "}
        <Link to="/sign-in" className="text-blue-400">
          Sign in
        </Link>
      </p>
    </div>
  );
}
