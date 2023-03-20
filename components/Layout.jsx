import { Dialog, Transition } from "@headlessui/react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { IoCompassSharp, IoHelpBuoySharp, IoLogOut } from "react-icons/io5";
import { MdAccountCircle, MdPrivacyTip } from "react-icons/md";
import classNames from "../utils/classNames";
import AudioPlayer from "./AudioPlayer";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: <AiFillHome className="fill-white h-6 w-6" alt="home" />,
    current: true,
  },
  {
    name: "Discover",
    href: "/discover",
    icon: <IoCompassSharp className="fill-white h-6 w-6" alt="home" />,
    current: true,
  },
];
const secondaryNavigation = [
  {
    name: "Assistance",
    href: "/me/help",
    icon: <IoHelpBuoySharp className="fill-white h-6 w-6" alt="help" />,
  },
  {
    name: "Privacy policy",
    href: "/me/privacy",
    icon: <MdPrivacyTip className="fill-white h-6 w-6" alt="privacy" />,
  },
];
const Profile = {
  name: "Profil",
  href: "/me/profile",
  icon: <MdAccountCircle className="fill-white h-8 w-8" alt="Profile" />,
  current: false,
};
const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="bg-background h-full">
      <div
        className={classNames(
          sidebarOpen ? "shadow-md" : " bg-background",
          "sticky w-full z-50 top-0 flex justify-between py-2 px-4 items-center bg-background/40 transition"
        )}
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            sidebarOpen ? null : setSidebarOpen(true);
          }}
          className="flex flex-col h-12 w-12 rounded-lg scale-75 justify-center cursor-pointer items-center group"
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

        <img src="/title.svg" className="w-36 fill-white" alt="title" />
        <Link
          href="/discover"
          aria-label="search"
          className="w-12 flex center-items justify-center "
        >
          <IoIosSearch size={22} strokeWidth={20} color="#e1e1e2" />
        </Link>
      </div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-30 "
          onClose={() => setTimeout(() => setSidebarOpen(false), 50)}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black backdrop-blur-lg md:backdrop-blur-none bg-opacity-75 overflow-clip" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-200/20">
              <nav className="mt-20 flex-shrink-0 h-full" aria-label="Sidebar">
                <div className="flex items-center mb-4">
                  <img
                    src="/logo.svg"
                    className="w-10 ml-4 sm:ml-6 fill-white mr-4"
                    alt="title"
                  />
                  <p className="font-bold text-gray-200 text-xl">Welcome!</p>
                </div>
                <div className="px-3 py-1 sm:px-6 space-y-2">
                  {navigation.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className={classNames(
                        router.asPath === item.href
                          ? "bg-tertiary rounded-md"
                          : "bg-primary/10 rounded-md sm:hover:bg-secondary/40",
                        "group flex items-center px-3 py-2 text-base font-medium focus:outline-none"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.icon}
                      <p className="ml-4 text-white text-lg">{item.name}</p>
                    </Link>
                  ))}
                </div>
                <div className="px-3 sm:px-6 mt-6 h-full">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        router.pathname === item.href
                          ? "text-white"
                          : "text-white sm:hover:bg-secondary/40",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                    >
                      {item.icon}
                      <p className="ml-4 text-white">{item.name}</p>
                    </Link>
                  ))}
                </div>
                <div className="absolute sm:px-10 flex justify-between items-center bottom-10 w-full px-6">
                  <Link
                    href={Profile.href}
                    className={
                      router.asPath === "/me/profile"
                        ? "flex items-center opacity-85 bg-primary p-2 rounded-lg"
                        : "flex items-center opacity-85 bg-secondary/50 p-2 rounded-lg sm:hover:bg-secondary/30"
                    }
                  >
                    {Profile.icon}
                  </Link>
                  <button
                    className="flex items-center opacity-85 bg-secondary/50 p-2 rounded-lg sm:hover:bg-secondary/30"
                    onClick={() => {
                      deleteCookie("refreshToken");
                      deleteCookie("accessToken");
                      router.push("/login");
                    }}
                  >
                    <IoLogOut className="fill-white w-8 h-8 " />
                  </button>
                </div>
              </nav>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      {children}
      <div className="h-24 w-full mt-32" />
      <div className="fixed bottom-0 w-full z-20 opacity-70">
        <AudioPlayer />
      </div>
    </div>
  );
}
