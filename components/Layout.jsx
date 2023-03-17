import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Sidemenu from "./Sidemenu";
import classNames from "../utils/classNames";

const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-background h-full ">
      <div
        className={classNames(
          sidebarOpen ? "shadow-md" : " bg-background",
          "sticky w-full z-50 top-0 flex justify-between py-2 px-4 items-center bg-background transition"
        )}
      >
        <div
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
          className="flex flex-col h-12 w-12 rounded-lg scale-90 justify-center cursor-pointer items-center group"
        >
          <div
            className={`${genericHamburgerLine} ${
              sidebarOpen
                ? "rotate-45 translate-y-3 opacity-70 group-hover:opacity-90 bg-white"
                : "opacity-50 group-hover:opacity-70 bg-white"
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              sidebarOpen
                ? "opacity-0 bg-white"
                : "opacity-70 group-hover:opacity-90 bg-white"
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              sidebarOpen
                ? "-rotate-45 bg-white -translate-y-3 opacity-70 group-hover:opacity-90"
                : "opacity-70 bg-white group-hover:opacity-90"
            }`}
          />
        </div>

        <p className="text-lg font-bold text-text">Musical haven</p>
        <button
          aria-label="search"
          className="w-12 flex center-items justify-center "
        >
          <IoIosSearch size={22} strokeWidth={20} color="#e1e1e2" />
        </button>
      </div>
      <Sidemenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {children}
    </div>
  );
}
