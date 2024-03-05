import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData((curFormData) => {
      return {
        ...curFormData,
        [e.target.id]: e.target.value,
      };
    });
    console.log(formData);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const body = JSON.stringify(formData);
      const res = await fetch("/api1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      const data = await res.json();

      if (data.success == false) {
        setErr(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setErr(null);
      navigate("/sign-in", { replace: true });
    } catch (err) {
      setLoading(false);
      setErr(err.message);
    }
  };

  return (
    <div className="sm:max-w-lg mx-auto max-h-96 flex justify-between items-center flex-col p-1">
      <h1 className="text-center text-fuchsia-900 my-3 font-bold text-2xl">
        Sign Up
      </h1>
      <form onSubmit={onSubmitHandler} className="w-50 max-w-lg p-3">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={onChangeHandler}
          className="p-3 rounded-md w-full my-2 outline-none focus:outline-fuchsia-500"
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          onChange={onChangeHandler}
          className="p-3 rounded-md w-full my-2 outline-none focus:outline-fuchsia-500"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={onChangeHandler}
          className="p-3 rounded-md w-full my-2 outline-none focus:outline-fuchsia-500"
        />
        <button
          type="submit"
          className="bg-fuchsia-800 text-white hover:opacity-95 cursor-pointer w-full p-3 my-2 rounded-md disabled:opacity-80 uppercase"
          disabled={loading}
        >
          {loading ? "..." : "sign up"}
        </button>
        <button className="bg-red-700 text-white hover:opacity-95 cursor-pointer w-full p-3 my-2 rounded-md disabled:opacity-80 uppercase">
          continue with google
        </button>
      </form>
      <p>
        Have an account?&nbsp;
        <Link to="/sign-in" className="text-blue-400">
          Sign in
        </Link>
      </p>

      {err && <p className="text-red-500 mt-5">{err}</p>}
    </div>
  );
}
