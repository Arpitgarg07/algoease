"use client";
import React from "react";
import "./index.css";
import TradingViewWidget from "@/components/TradingViewWIdget";
import { useTheme } from "next-themes";
import DragAdder from "@/components/DragAdder";

export default function Trade() {
  // const { theme } = useTheme();

  // React.useEffect(() => {
  //   if (theme === "dark") {
  //     document.body.classList.add("dark-mode");
  //   } else {
  //     document.body.classList.remove("dark-mode");
  //   }
  // }, [theme]);

  return (
    <main className="trade">
      <div className="vertical-sections">
        <div className="tv-graph">
          <TradingViewWidget symbol="ETH/USDT" />
        </div>
        <div className="drag-drop">
          <DragAdder />
        </div>
      </div>
    </main>
  );
}
