import { create } from "zustand";

export const usePlaylist = create((set) => ({
<<<<<<< HEAD
  playlist: [
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
  ],
=======
  playlist: [],
>>>>>>> 3a3abc6eb45ad82edfc433303086dd3f5e20066e
  currentSong: null,
  setPlaylist: (playlist) => set({ playlist }),
  setCurrentSong: (currentSong) => set({ currentSong }),
}));
