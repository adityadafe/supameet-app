import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function getUser() {
    const temp = await supabase.auth.getUser()
    const session = await supabase.auth.getSession()
    console.log(session)
    console.log(temp)
  }


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function signInWithSpotify() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        scopes: "user-read-currently-playing",
      }
    })

    console.log(data, error)
  }



  return (
    <nav className="bg-slate-600 text-black fixed w-full z-20 top-0 left-0 ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
          STRZZ
        </span>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-gray-500 md:hidden hover:text-gray-700 focus:outline-none focus:text-gray-700"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div
            className={`${isMenuOpen ? "block" : "hidden"
              } md:flex md:items-center`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col items-center md:flex-row md:space-x-11 md:items-center mr-20">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  Home
                </Link>
              </li>

              <Button onClick={signInWithSpotify}>sign-in</Button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
