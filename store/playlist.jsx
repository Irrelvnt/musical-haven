import { create } from "zustand";

export const usePlaylist = create((set) => ({
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
  currentSong: null,
  setPlaylist: (playlist) => set({ playlist }),
  setCurrentSong: (currentSong) => set({ currentSong }),
}));
