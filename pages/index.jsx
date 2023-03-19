import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { HiHeart, HiPlus } from "react-icons/hi";
import { IoClose, IoCompassSharp } from "react-icons/io5";
import { RxShuffle } from "react-icons/rx";
import Layout from "../components/Layout";
import Song from "../components/Song";
import { useCreatePlaylist } from "../hooks/useCreatePlaylist";
import { usePlaylist } from "../store/playlist";
import classNames from "../utils/classNames";
import { useAuth } from "../hooks/useAuth";

const shuffleSongs = (array) => {
  var shuffled = array;
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
};

const Home = () => {
  const playlist = usePlaylist((state) => state.playlist);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [selected, setSelected] = useState([]);
  const [stat, setStat] = useState(null);
  const { data: user } = useAuth();
  const { handleChange, handleSubmit } = useCreatePlaylist();

  const [shuffle, setShuffle] = useState(false);

  const updateFavourites = async (songs) => {
    try {
      await axios.post("/api/playlist/favourites", {
        songs,
      });
    } catch (e) {}
  };
  return (
    <>
      <Head>
        <title>Musical haven</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="text-text relative px-4 pb-8 transition w-full mx-auto max-w-4xl h-screen">
          {createPlaylist && (
            <div className="absolute z-40 inset-0 px-4">
              <div
                className={
                  stat === "loading"
                    ? "absolute inset-0 bg-white/60 flex flex-col items-center justify-center transition rounded-xl z-40"
                    : "hidden"
                }
              >
                <div className="h-12 w-12 border-4 border-t-tertiary border-r-tertiary border-l-tertiary rounded-full animate-spin transition opacity-100" />
                <span className="text-lg text-gray-600 font-semibold mt-6">
                  Crearting playlist...
                </span>
              </div>
              <div
                className="absolute inset-0 w-full h-full backdrop-blur-sm transition"
                onClick={() => setCreatePlaylist(false)}
              />
              <div className="max-w-lg w-full mx-auto bg-card/90 rounded-lg px-4 py-3 relative z-10">
                <div className="w-full flex justify-between">
                  <p className="text-gray-100 font-medium text-lg">
                    Create Playlist
                  </p>
                  <IoClose
                    className="w-6 h-6 fill-tertiary hover:bg-primary/40 transition cursor-pointer rounded-full"
                    onClick={() => setCreatePlaylist(false)}
                  />
                </div>
                <form
                  onSubmit={(e) => {
                    handleSubmit(e, setStat);
                  }}
                >
                  <div className="mt-4">
                    <label className="block text-base font-medium text-gray-100">
                      New playlist
                    </label>
                    <div className="mt-1 border-b border-gray-100 focus-within:border-tertiary">
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="name"
                        id="name"
                        max={50}
                        required
                        className="block w-full border-0 border-b
                      text-gray-100 placeholder:text-gray-300 border-transparent
                      bg-gray-700/70 focus:border-tertiary focus:ring-0
                      sm:text-sm"
                        placeholder="Song title"
                      />
                    </div>
                  </div>
                  <p className="text-lg font-medium text-gray-100 mt-4">
                    Playlist
                  </p>
                  <div className="w-full max-h-44 overflow-auto mt-6 space-y-4">
                    {playlist.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-full rounded-lg mr-2">
                          <Song
                            title={item.title}
                            artist={item.artist}
                            cover={item.cover}
                            time={item.time}
                          />
                        </div>
                        <IoClose
                          onClick={() => {
                            setPlaylist(
                              playlist.filter(
                                (song) => song.title !== item.title
                              )
                            );
                          }}
                          className="w-6 h-6 fill-secondary hover:bg-primary/40 transition cursor-pointer rounded-full mr-2"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className={classNames(
                        playlist.length === 0
                          ? "cursor-not-allowed"
                          : "md:hover:text-white md:hover:bg-[#59b7c3]",
                        "w-full max-w-[15rem] mx-auto flex justify-center p-2 md:py-2 text-sm md:text-base font-medium rounded-md text-[#21565a] bg-[#b3e5ec]  md:px-6 active:scale-95 transition"
                      )}
                    >
                      create playlist
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="fixed inset-0 z-0 transform-gpu overflow-hidden blur-3xl ">
            <svg
              className="relative opacity-100 left-[calc(50%-11rem)] h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".15"
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
          <div className="flex justify-between items-center mt-10 mb-4 relative z-10">
            <p className="font-semibold text-lg">Explore</p>
            <span className="flex items-center">
              <button
                aria-label="add"
                onClick={() => setCreatePlaylist(true)}
                className="flex items-center hover:bg-primary/40 px-1 rounded-lg transition"
              >
                <HiPlus className=" w-5 h-5 fill-white mr-2" />
                <p className="mb-1">create playlist</p>
              </button>
            </span>
          </div>
          <div className="flex gap-4 w-full mt-4 overflow-auto sm:overflow-hidden">
            <Link
              href="/favourites"
              className="relative w-36 h-36 bg-card rounded-md transition hover:scale-105"
            >
              <HiHeart size={"2rem"} color="red" className="mx-14 mt-12" />
              <p className="absolute z-20 bottom-3 left-5 font-semibold text-sm ">
                Favorites
              </p>
            </Link>
            <Link
              href="/discover"
              className="relative w-36 h-36 bg-card rounded-md transition hover:scale-105"
            >
              <IoCompassSharp
                size={"2rem"}
                className="mx-14 mt-12 fill-gray-200"
              />
              <p className="absolute z-20 bottom-3 left-5 font-semibold text-sm ">
                Discover
              </p>
            </Link>
          </div>
          <div className="flex justify-between  items-center mt-10 mb-4 relative z-10">
            <p className="font-semibold text-lg">Currently playing</p>
            <div className="flex gap-4 items-center">
              <RxShuffle
                size={18}
                color="#e1e1e2"
                onClick={() => {
                  setShuffle(true);
                  setTimeout(() => {
                    setShuffle(false);
                  }, 100);
                }}
                className={classNames(
                  shuffle ? "bg-tertiary" : "",
                  "hover:bg-primary/40 rounded-full cursor-pointer"
                )}
              />
              <HiHeart
                onClick={() => {
                  if (selected.length === 0) {
                    return;
                  }
                  updateFavourites(selected);
                }}
                size={20}
                className="hover:bg-primary/40 rounded-full fill-gray-200 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4 overflow-y-auto relative z-10">
            {(shuffle ? shuffleSongs(playlist) : playlist).map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  playlist.includes(item)
                    ? setPlaylist(playlist.filter((i) => i !== item))
                    : setPlaylist([...playlist, item]);
                }}
                className="hover:bg-primary/10 transition pr-2 rounded-md cursor-pointer"
              >
                <Song
                  selected={playlist.includes(item)}
                  title={item.title}
                  cover={item.cover}
                  time={item.time}
                  artist={item.artist}
                />
              </div>
            ))}
            {playlist.length === 0 && (
              <div className="space-y-4">
                <p className="text-center font-bold text-lg text-gray-200 mt-12">
                  Nothing to show
                </p>
                <p className="text-center text-gray-400 mt-12">
                  Start by searching for a playlist
                </p>
              </div>
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
