import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { IoHelpBuoySharp, IoLogOut } from "react-icons/io5";
import { MdAccountCircle, MdPrivacyTip } from "react-icons/md";
import classNames from "../utils/classNames";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: <AiFillHome className="fill-white h-6 w-6" alt="home" />,
    current: true,
  },
  {
    name: "My playlists",
    href: "/me/myplaylists",
    icon: <FaBook className="fill-white h-6 w-6" alt="ebook" />,
    current: false,
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

export default function Sidemenu({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter();
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 "
        onClose={setSidebarOpen}
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
          <Dialog.Overlay className="fixed inset-x-0 top-12 bottom-0 bg-black backdrop-blur-sm bg-opacity-75" />
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
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-card">
            <nav className="mt-20 flex-shrink-0 h-full" aria-label="Sidebar">
              <p className="px-2 sm:px-4 font-bold text-lg sm:text-xl text-white mb-6">
                Musical haven
              </p>
              <div className="px-2 sm:px-4 space-y-2">
                {navigation.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className={classNames(
                      router.asPath === item.href
                        ? "bg-tertiary rounded-md"
                        : "bg-primary/40 rounded-md  sm:hover:bg-secondary/40",
                      "group flex items-center px-2 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.icon}
                    <p className="ml-4 text-white">{item.name}</p>
                  </Link>
                ))}
              </div>
              <div className="px-2 sm:px-4 mt-6 h-full">
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
              <div className="absolute sm:px-4 flex justify-between items-center bottom-10 w-full px-2">
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
                <button className="flex items-center opacity-85 bg-secondary/50 p-2 rounded-lg sm:hover:bg-secondary/30">
                  <IoLogOut className="fill-white w-8 h-8 " />
                </button>
              </div>
            </nav>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
