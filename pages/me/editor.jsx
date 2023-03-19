import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import Layout from "../../components/layout";
import Song from "../../components/primitive/Song";
import useAuth from "../../hooks/useAuth";
import { usePlaylist } from "../../store/playlist";

export default function Editor() {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const setPlaylist = usePlaylist((state) => state.setPlaylist);
  const setCurrentSong = usePlaylist((state) => state.setCurrentSong);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: user } = useAuth();

  const getRecommendations = async () => {
    try {
      const { data } = await axios.get("/api/recommendation", {
        params: { name: search },
      });
      console.log(data.videos[0]);
      setResults(data.videos);
    } catch (e) {}
    setLoading(false);
  };
  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    getRecommendations();
  };
  useEffect(() => {
    if (user) {
      setResults(user?.user.favourites);
      setLoading(false);
    }
  }, [user]);
  return (
    <Layout>
      <main className="relative w-screen h-screen max-w-4xl mx-auto">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MdEditNote className="w-7 h-7 fill-gray-200" />
                <p className="text-xl font-medium text-gray-100 ml-4">Editor</p>
              </div>
              <div
                className="flex items-center hover:bg-primary/20 transition rounded-lg px-2 cursor-pointer mt-1"
                onClick={() => {
                  setPlaylist(selected);
                  setCurrentSong(selected[0]?.url);
                }}
              >
                <p className="text-base font-medium text-gray-100 mb-1 mr-2">
                  play
                </p>
                <AiFillPlayCircle className="w-4 h-4 fill-gray-100" />
              </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="mt-8">
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-100"
                >
                  Search
                </label>
                <div className="mt-1 border-b relative items-center border-gray-100 focus-within:border-tertiary flex justify-between">
                  <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="name"
                    id="name"
                    max={50}
                    required
                    className="block w-full border-0 border-b text-gray-100 placeholder:text-gray-300 border-transparent bg-gray-700/70 focus:border-tertiary focus:ring-0 sm:text-sm"
                    placeholder="Song title"
                  />
                  <button
                    type="submit"
                    className="hover:bg-primary/20 absolute right-2 p-1 transition bg-transparent rounded-full"
                  >
                    <FaSearch className="w-6 h-6 fill-white" />
                  </button>
                </div>
                <div className="flex flex-col space-y-2 mt-6 relative z-20">
                  {results?.map((item, idx) => (
                    <div
                      key={idx}
                      className="hover:bg-primary/20 transition rounded-lg pr-2 cursor-pointer"
                      onClick={() => {
                        if (selected.includes(item)) {
                          setSelected(selected.filter((i) => i !== item));
                        } else {
                          setSelected([...selected, item]);
                        }
                      }}
                    >
                      <Song
                        artist={item.snippet?.channelTitle}
                        title={item.snippet.title}
                        cover={item.snippet.thumbnails?.high.url}
                        time={item.contentDetails?.duration}
                        selected={selected.includes(item)}
                      />
                    </div>
                  ))}
                  {results.length === 0 && !loading && (
                    <div className="space-y-4">
                      <p className="text-center font-bold text-lg text-gray-200 mt-12">
                        Nothing to show
                      </p>
                      <p className="text-center text-gray-400 mt-12">
                        Start by searching for a song
                      </p>
                    </div>
                  )}
                  <div
                    className={
                      loading
                        ? " flex flex-col items-center justify-center transition rounded-xl z-40 mt-12"
                        : "hidden"
                    }
                  >
                    <div className="h-12 w-12 border-4 border-t-tertiary border-r-tertiary border-l-tertiary rounded-full animate-spin transition opacity-100" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
