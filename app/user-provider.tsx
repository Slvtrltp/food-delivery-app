"use client";
import { create } from "zustand";
import { User } from "./generated/prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
type UseUserStore = {
  user: User | null;
  accessToken: string;
  setUser: (user: User | null) => void;
  setAccessToken: (accessToken: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};
const useUserStore = create<UseUserStore>((set) => ({
  user: null,
  accessToken: "",
  loading: true,
  setUser: (user: User | null) => set(() => ({ user })),
  setAccessToken: (accessToken: string) => set(() => ({ accessToken })),
  setLoading: (loading: boolean) => set(() => ({ loading })),
  logout: () => {
    localStorage.removeItem("accessToken");
    set(() => ({ user: null, accessToken: "" }));
  },
}));

export const useUser = () => {
  const { user, accessToken, setAccessToken, loading, logout } = useUserStore();

  return { user, accessToken, setAccessToken, loading, logout };
};
export const UserProvider = () => {
  const { accessToken, setUser, setAccessToken, setLoading } = useUserStore();
  useEffect(() => {
    if (window) {
      if (localStorage.getItem("accessToken")) {
        setAccessToken(localStorage.getItem("accessToken") || "");
      } else {
        setLoading(false);
      }
    }
  }, []);
  useEffect(() => {
    if (!accessToken) return;

    setLoading(true);
    axios
      .get("/api/auth/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(({ response }) => {
        localStorage.removeItem("accessToken");
        if (response?.data?.message) {
          alert(response.data.message);
        }
        setUser(null);
        setAccessToken("");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [accessToken]);

  return null;
};
