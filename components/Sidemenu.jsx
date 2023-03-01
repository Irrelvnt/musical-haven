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
    href: "/me",
    icon: <AiFillHome className="fill-white h-6 w-6" alt="home" />,
    current: true,
  },
  {
    name: "My playlists",
    href: "/me/ebooks",
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
    name: "Confidentialité",
    href: "/me/privacy",
    icon: <MdPrivacyTip className="fill-white h-6 w-6" alt="privacy" />,
  },
];
const Profile = {
  name: "Profil",
  href: "/me/profile",
  icon: <MdAccountCircle className="fill-white h-6 w-6" alt="Profile" />,
  current: false,
};

export default function Sidemenu({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter();
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
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
          <Dialog.Overlay className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-75" />
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
              <div className="px-2 space-y-2">
                {navigation.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className={classNames(
                      router.pathname === item.href
                        ? "bg-white text-white rounded-md"
                        : "bg-white/10 rounded-md text-primary hover:text-white hover:bg-white/40",
                      "group flex items-center px-2 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.icon}
                    <p className="ml-4 text-white">{item.name}</p>
                  </Link>
                ))}
              </div>
              <div className="px-2 mt-6 h-full">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      router.pathname === item.href
                        ? "text-white"
                        : "text-primary sm:hover:text-white sm:hover:bg-white/10",
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    )}
                  >
                    {item.icon}
                    <p className="ml-4 text-white">{item.name}</p>
                  </Link>
                ))}
              </div>
              <div className="absolute bottom-10 w-full px-2">
                <Link
                  href={Profile.href}
                  className={
                    router.asPath === "/me/profile"
                      ? "flex items-center opacity-85 w-full bg-white p-2 rounded-lg mb-2"
                      : "flex items-center opacity-85 w-full bg-white/10 p-2 rounded-lg sm:hover:bg-white/30 mb-2"
                  }
                >
                  {Profile.icon}
                  <p className="text-md font-semibold text-white ml-4">
                    {Profile.name}
                  </p>
                </Link>
                <button className="flex items-center opacity-85 w-full bg-white/10 p-2 rounded-lg">
                  <IoLogOut className="fill-white w-5 h-5 " />
                  <p className="text-md font-semibold text-white ml-4">
                    Logout
                  </p>
                </button>
              </div>
            </nav>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </Dialog>
    </Transition.Root>
  );
}
