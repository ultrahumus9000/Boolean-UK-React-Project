import create from "zustand";

const useGame = create((set, get) => ({
  gameOver: false,
  stopGame: () => set({ gameOver: true }),
}));

export default useGame;
