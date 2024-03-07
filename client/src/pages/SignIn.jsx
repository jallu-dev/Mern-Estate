import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    const body = JSON.stringify(formData);
    try {
      const res = await fetch("/api1/auth/signin", {
        method: "POST",
        body,
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success == false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
      return;
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const onChangeHandler = (e) => {
    setFormData((curFormData) => {
      return {
        ...curFormData,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <div className="sm:max-w-lg mx-auto max-h-96 flex justify-between items-center flex-col p-1">
      <h1 className="text-center text-fuchsia-900 my-3 font-bold text-2xl">
        Sign In
      </h1>
      <form onSubmit={onSubmitHandler} className="w-50 max-w-lg p-3">
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
          {loading ? "..." : "sign in"}
        </button>
        <OAuth />
      </form>
      <p>
        Don&apos;t Have an account? &nbsp;
        <Link to="/sign-up" className="text-blue-400">
          Sign up
        </Link>
      </p>
      {error && <p className="text-red-500 mt-5 self-start">*{error}</p>}
    </div>
  );
}
