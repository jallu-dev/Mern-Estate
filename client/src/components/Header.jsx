import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-fuchsia-800 shadow-md flex justify-between items-center mx-auto p-3">
      <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-fuchsia-100">JD</span>
          <span className="text-fuchsia-400">Estate</span>
        </h1>
      </Link>

      <form className="bg-slate-100 px-3 py-1 rounded-lg flex justify-between items-center text-slate-600">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-24 sm:w-64"
        />
        <FaSearch className="text-fuchsia-600" />
      </form>
      <ul className="flex gap-4">
        {currentUser ? (
          <>
            <li className="text-fuchsia-200 hidden sm:inline cursor-pointer px-2 py-1 rounded-md hover:bg-fuchsia-200 hover:text-fuchsia-800">
              <Link to="/">Home</Link>
            </li>
            <li className="text-fuchsia-200 hidden sm:inline cursor-pointer px-2 py-1 rounded-md hover:bg-fuchsia-200 hover:text-fuchsia-800">
              <Link to="/about">About</Link>
            </li>
          </>
        ) : (
          <></>
        )}

        {currentUser ? (
          <Link to="/profile">
            <img src={currentUser.photo} className="rounded-full w-10 h-10" />
          </Link>
        ) : (
          <li className="text-fuchsia-200 cursor-pointer px-2 py-1 rounded-md hover:bg-fuchsia-200 hover:text-fuchsia-800">
            <Link to="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </header>
  );
}
