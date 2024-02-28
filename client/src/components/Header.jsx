import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md flex justify-between items-center mx-auto p-3">
      <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Jallu</span>
          <span className="text-slate-700">Estate</span>
        </h1>
      </Link>

      <form className="bg-slate-100 px-3 py-1 rounded-lg flex justify-between items-center text-slate-600">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-24 sm:w-64"
        />
        <FaSearch />
      </form>
      <ul className="flex gap-4">
        <li
          className="text-slate-700 hidden sm:inline border
            hover:border-black cursor-pointer px-2 py-1 rounded-md hover:bg-slate-800 hover:text-slate-100"
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className="text-slate-700 hidden sm:inline border
            hover:border-black cursor-pointer px-2 py-1 rounded-md hover:bg-slate-800 hover:text-slate-100"
        >
          <Link to="/about">About</Link>
        </li>
        <li
          className="text-slate-700 sm:inline border
            hover:border-black cursor-pointer px-2 py-1 rounded-md hover:bg-slate-800 hover:text-slate-100"
        >
          <Link to="/sign-in">Sign In</Link>
        </li>
      </ul>
    </header>
  );
}
