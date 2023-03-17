import { useState } from "react";
import { IoCompassSharp } from "react-icons/io5";
import Layout from "../components/layout";
import Song from "../components/song";

const results = [
  {
    id: 1,
    title: "Video 1",
    thumbnail: "/music.webp",
    channel: "Channel 1",
    duration: "3:14",
  },
  {
    id: 2,
    title: "Video 2",
    thumbnail: "/music.webp",
    channel: "Channel 2",
    duration: "3:14",
  },
  {
    id: 3,
    title: "Video 3",
    thumbnail: "/music.webp",
    channel: "Channel 3",
    duration: "3:14",
  },
];

export default function Discover() {
  const [selected, setSelected] = useState([]);
  return (
    <Layout>
      <main className="relative w-screen max-w-4xl mx-auto">
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
        <div className="px-4 lg:px-6 relative z-20">
          <div className="rounded-lg px-4 py-3">
            <div className="flex items-center">
              <IoCompassSharp className="w-6 h-6 fill-gray-100" />
              <p className="text-xl font-medium text-gray-100 ml-4">Discover</p>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-100"
              >
                Search
              </label>
              <div className="mt-1 border-b border-gray-100 focus-within:border-tertiary">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="email"
                  id="email"
                  max={50}
                  required
                  className="block w-full border-0 border-b text-gray-100 placeholder:text-gray-300 border-transparent bg-gray-800 focus:border-tertiary focus:ring-0 sm:text-sm"
                  placeholder="search for a video"
                />
              </div>
              <div className="flex flex-col space-y-2 mt-8">
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="hover:bg-primary/20 rounded-lg transition"
                    onClick={() => {
                      if (selected.includes(item)) {
                        setSelected(selected.filter((i) => i !== item));
                      } else {
                        setSelected([...selected, item]);
                      }
                    }}
                  >
                    <Song
                      artist={item.channel}
                      title={item.title}
                      cover={item.thumbnail}
                      time={item.duration}
                      selected={selected.includes(item)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
