"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`w-fit absolute right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 
        ${
          theme === "light"
            ? "bg-zinc-300 text-black"
            : "bg-zinc-700 text-zinc-300"
        }
      `}
      onClick={() => setTheme(theme === "light" ? "light" : "dark")}
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
};
