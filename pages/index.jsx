import Head from "next/head";
import Link from "next/link";
import { HiHeart, HiPlus } from "react-icons/hi";
import { RiFilter3Fill } from "react-icons/ri";
import { RxShuffle } from "react-icons/rx";
import Card from "../components/Card";
import Song from "../components/Song";
import Layout from "../components/Layout";
import { useState } from "react";
import classNames from "../utils/classNames";

const cards = [
  {
    title: "Discover",
    image: "/music.webp",
  },
  {
    title: "Genres & Moods",
    image: "/music.webp",
  },
  {
    title: "Albums",
    image: "/music.webp",
  },
  {
    title: "Artists",
    image: "/music.webp",
  },
];
const songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    cover: "/music.webp",
    time: "3:00",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    cover: "/music.webp",
    time: "3:00",
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    cover: "/music.webp",
    time: "3:00",
  },
  {
    title: "Song 1",
    artist: "Artist 1",
    cover: "/music.webp",
    time: "3:00",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    cover: "/music.webp",
    time: "3:00",
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    cover: "/music.webp",
    time: "3:00",
  },
  {
    title: "Song 1",
    artist: "Artist 1",
    cover: "/music.webp",
    time: "3:00",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    cover: "/music.webp",
    time: "3:00",
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    cover: "/music.webp",
    time: "3:00",
  },
];

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
  const [selected, setSelected] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  return (
    <>
      <Head>
        <title>Musical haven</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="text-text relative px-4 pb-8 transition w-full lg:w-fit mx-auto max-w-4xl">
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
            <span className="flex items-center gap-4">
              <button aria-label="add">
                <HiPlus
                  size={20}
                  className="hover:bg-primary/40 rounded-full fill-white"
                />
              </button>
              <button aria-label="filter">
                <RiFilter3Fill
                  size={20}
                  className="hover:bg-primary/40 rounded-full fill-white"
                />
              </button>
            </span>
          </div>
          <div className="flex gap-4 w-full mt-4 overflow-auto sm:overflow-hidden">
            <Link
              href="/"
              className="relative w-36 h-36 bg-card rounded-md transition hover:scale-105"
            >
              <HiHeart size={"2rem"} color="red" className="mx-14 mt-12" />
              <p className="absolute z-20 bottom-3 left-5 font-semibold text-sm ">
                Favorites
              </p>
            </Link>
            {cards.map((item, idx) => (
              <div key={idx + 1}>
                <Card title={item.title} image={item.image} />
              </div>
            ))}
          </div>
          <div className="flex justify-between  items-center mt-10 mb-4 relative z-10">
            <p className="font-semibold text-lg">Songs</p>
            <div className="flex gap-4 items-center">
              <RxShuffle
                size={18}
                color="#e1e1e2"
                onClick={() => setShuffle(!shuffle)}
                className={classNames(
                  shuffle ? "bg-tertiary" : "",
                  "hover:bg-primary/40 rounded-full cursor-pointer"
                )}
              />
              <RiFilter3Fill
                size={20}
                color="#e1e1e2"
                className="hover:bg-primary/40 rounded-full cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4 overflow-y-auto relative z-10">
            {(shuffle ? shuffleSongs(songs) : songs).map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  selected.includes(item)
                    ? setSelected(selected.filter((i) => i !== item))
                    : setSelected([...selected, item]);
                }}
                className="hover:bg-primary/10 transition pr-2 rounded-md cursor-pointer"
              >
                <Song
                  selected={selected.includes(item)}
                  title={item.title}
                  cover={item.cover}
                  time={item.time}
                  artist={item.artist}
                />
              </div>
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
