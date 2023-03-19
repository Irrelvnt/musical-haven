import { create } from "zustand";

export const usePlaylist = create((set) => ({
  playlist: [],
  currentSong: null,
  setPlaylist: (playlist) => set({ playlist }),
  setCurrentSong: (currentSong) => set({ currentSong }),
}));
