import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

function Header({ setSearch, history }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header class="text-gray-100 bg-gray-900 body-font shadow w-full">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
          <span class="ml-3 text-xl justify-center">Anime Finder</span>
        </a>
        <div class="w-50 justify-center">
          <input
            type="search"
            class="w-50 px-4 py-1 text-gray-900 rounded-full focus:outline-none"
            placeholder="search"
            x-model="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            class="flex items-center justify-center w-12 h-12 text-gray-100 rounded-full"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <a
            href="/"
            class="bg-indigo-700 hover:bg-indigo-500 text-white ml-4 py-2 px-3 rounded-lg"
            onClick={logoutHandler}
          >
            Log Out
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
