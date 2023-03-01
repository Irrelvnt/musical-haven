import Head from "next/head";
import Link from "next/link";
import { HiHeart, HiPlus } from "react-icons/hi";
import { RiFilter3Fill } from "react-icons/ri";
import { RxShuffle } from "react-icons/rx";
import Card from "../components/Card";
import Song from "../components/Song";
import Layout from "../components/Layout";

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

const Home = () => {
  return (
    <>
      <Head>
        <title>Musical haven</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <main className="text-text px-4 pb-8 transition">
            <div className="flex justify-between items-center mt-10 mb-4">
              <p className="font-semibold text-lg">Explore</p>
              <span className="flex items-center gap-4">
                <button aria-label="add">
                  <HiPlus size={20} color="#e1e1e2" />
                </button>
                <button aria-label="filter">
                  <RiFilter3Fill size={20} color="#e1e1e2" />
                </button>
              </span>
            </div>
            <div className="flex gap-4 w-full mt-4 overflow-scroll sm:overflow-hidden">
              <Link href="/" className="relative w-36 h-36 bg-card rounded-md">
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
            <div className="flex justify-between  items-center mt-10 mb-4">
              <p className="font-semibold text-lg">Songs</p>
              <div className="flex gap-4 items-center">
                <RxShuffle size={18} color="#e1e1e2" />
                <RiFilter3Fill size={20} color="#e1e1e2" />
              </div>
            </div>
            <div className="flex flex-col gap-4  mt-4 overflow-y-scroll">
              {songs.map((item, idx) => (
                <div key={idx}>
                  <Song
                    title={item.title}
                    cover={item.cover}
                    time={item.time}
                    artist={item.artist}
                  />
                </div>
              ))}
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default Home;
