import { create } from "zustand";

export const usePlaylist = create((set) => ({
  playlist: null,
  name: null,
  setPlaylist: (playlist) => set({ playlist }),
  setName: (name) => set({ name }),
}));
