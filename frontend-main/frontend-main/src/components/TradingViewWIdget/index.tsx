"use client";
import { useTradeStore } from "@/states/trade.state";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise: Promise<void> | null;

interface TradingViewWidgetProps {
  symbol: string;
}

export default function TradingViewWidget({
  symbol,
}: TradingViewWidgetProps): any {
  const onLoadScriptRef = useRef<(() => void) | null>();

  const tvParam = useTradeStore((s: any) => s.tvParam);

  const { theme } = useTheme();

  useEffect(() => {
    console.log(tvParam);
  }, [tvParam]);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise<void>((resolve: () => void) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (
        document.getElementById("tradingview_1bf28") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `${tvParam}`,
          interval: "D",
          timezone: `Etc/UTC`,
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_1bf28",
        });
      }
    }
  }, [tvParam]);

  return (
    <div className="tradingview-widget-container h-full w-full">
      <div id="tradingview_1bf28" className="h-full w-100" />
      {/* <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div> */}
    </div>
  );
}
