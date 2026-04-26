import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  setAuthenticated: (userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  userId: null,
  setAuthenticated: userId => set({ isAuthenticated: true, userId }),
  logout: () => set({ isAuthenticated: false, userId: null }),
}));
