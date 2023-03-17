import Link from "next/link";
import { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { BsFacebook, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { IoLogIn } from "react-icons/io5";
import Layout from "../components/Layout";
import { useRegister } from "../hooks/useRegister";

export default function Register() {
  const [stat, setStat] = useState(null);
  const { handleChange, handleSubmit } = useRegister();
  const [opacity, setOpacity] = useState(0);
  setTimeout(() => {
    setOpacity(1);
  }, 150);
  return (
    <Layout>
      <div
        className="overflow-hidden relative h-screen transition duration-700 "
        style={{ opacity }}
      >
        <div className="relative h-[85vh] flex items-center justify-center">
          <div className="fixed inset-0 z-0 transform-gpu overflow-hidden blur-3xl ">
            <svg
              className="relative opacity-100 left-[calc(50%-11rem)] h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#a036d6" />
                  <stop offset={1} stopColor="#a036d6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <main className="z-10 w-full flex justify-center mx-2 md:mt-0">
            <div className="flex flex-col w-full lg:mx-12 max-w-xl lg:w-[40rem] ">
              <Link
                href="/"
                className="hidden md:flex items-center text-tertiary ml-2 -mt-10 lg:hover:text-octonary"
              >
                <div className="bg-octonary shadow-small lg:hover:bg-tertiary transition active:scale-95 flex items-center px-2 py-1 rounded-full font-semibold text-white">
                  <BsFillArrowLeftCircleFill className="h-5 w-5 mr-2 fill-white transition" />
                  <span>Return</span>
                </div>
              </Link>
              <div className="bg-white backdrop-blur-md relative shadow-lg rounded-xl mt-4 pt-2">
                <div
                  className={
                    stat === "loading"
                      ? "absolute inset-0 bg-white/60 flex flex-col items-center justify-center transition rounded-xl z-40"
                      : "hidden"
                  }
                >
                  <div className="h-12 w-12 border-4 border-t-tertiary border-r-tertiary border-l-teritary rounded-full animate-spin transition opacity-100" />
                  <span className="text-lg text-tertiary font-semibold mt-6">
                    Loading...
                  </span>
                </div>
                <div className="flex gap-3 items-center mx-2">
                  <IoLogIn className="fill-gray-700 w-7 h-7" />{" "}
                  <h1 className="text-xl first-letter:md:text-[1.8rem] font-bold text-gray-700">
                    Welcome aboard!
                  </h1>
                </div>
                <p className="mt-4 text-gray-700 text-[1rem] mx-3">
                  Sign up using
                </p>
                <div className="mt-2 grid grid-cols-2 gap-3 mx-3">
                  <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border-2 border-gray-50 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-gray-100 lg:hover:bg-gray-50 transition"
                    >
                      <BsFacebook className="h-5 w-8 drop-shadow-sm fill-gray-100" />
                      Facebook
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border-2 border-gray-50 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-gray-100 hover:bg-gray-50 transition"
                    >
                      <AiFillGoogleCircle className="h-5 w-8 drop-shadow-sm fill-gray-100" />
                      Google
                    </a>
                  </div>
                </div>

                <div className="mt-6 relative mx-3">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-400" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white ">
                      {stat === "error" ? (
                        <span className="text-red-400 font-semibold">
                          Email already in use!
                        </span>
                      ) : (
                        <span className="text-gray-600 text-[1.05rem]">
                          or continue with
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <form
                    onSubmit={(e) => handleSubmit(e, setStat)}
                    className="space-y-6"
                  >
                    <div className="mx-3">
                      <div className="mt-1">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <div className="mt-1 border-b border-gray-300 focus-within:border-tertiary">
                            <input
                              onChange={(e) => handleChange(e)}
                              type="text"
                              name="email"
                              id="email"
                              max={50}
                              required
                              className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-tertiary focus:ring-0 sm:text-sm"
                              placeholder="Adress e-mail"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 mx-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <div>
                          <div className="mt-1 border-b border-gray-300 focus-within:border-tertiary">
                            <input
                              type="password"
                              name="password"
                              id="pasword"
                              onChange={(e) => handleChange(e)}
                              maxLength={20}
                              autoComplete="current-password"
                              required
                              className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-tertiary focus:ring-0 sm:text-sm"
                              placeholder="Mot de passe"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center mx-3">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-5 w-5 text-tertiary focus:ring-tertiary border-gray-400 rounded cursor-pointer"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-3 block text-sm text-gray-600"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm mx-3">
                        <Link
                          href="/login"
                          className="font-medium text-tertiary lg:hover:text-tertiary lg:hover:underline transition"
                        >
                          Already have an account?
                        </Link>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={stat === "loading"}
                      className="w-full flex justify-center py-3 px-4  rounded-b-xl shadow-sm text-sm font-medium text-white bg-tertiary lg:hover:bg-octonary transition border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary"
                    >
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
