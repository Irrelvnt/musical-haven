import Hamburger from "hamburger-react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Sidemenu from "./Sidemenu";
import classNames from "../utils/classNames";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-background h-full">
      <div
        className={classNames(
          sidebarOpen ? "shadow-md" : " bg-background",
          "sticky w-full z-50 top-0 flex justify-between py-2 px-4 items-center bg-background transition"
        )}
      >
        <Hamburger
          toggled={sidebarOpen}
          toggle={setSidebarOpen}
          color="#e1e1e2"
          size={20}
          rounded
        />

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
