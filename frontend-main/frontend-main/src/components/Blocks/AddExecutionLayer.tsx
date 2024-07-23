import { getIconUrl } from "@/utils";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { useTradeStore } from "@/states/trade.state";

function AddExecutionLayer() {
  const modal2 = useRef<any>(null);

  const [selected, setSelected] = useState<any>(null);

  const setExecutionLayer = useTradeStore((s: any) => s.setExecutionLayer);

  const { theme } = useTheme();

  const layers = [
    {
      name: "fusionswap",
      display: "Fusion Swap",
      icon: "cow",
    },
    {
      name: "uniswap",
      display: "UniSwap",
      icon: "cow",
    },
    {
      name: "sushiswap",
      display: "Sushi Swap",
      icon: "cow",
    },
  ];

  return (
    <>
      {selected ? (
        <div
          className="h-22.5 cursor-pointer rounded-xl border border-separate border-zinc-600 transition flex flex-col justify-between theme-colors"
          onClick={() => modal2.current!.showModal()}
        >
          <div className="p-5 rounded-t-xl flex items-center justify-between">
            <h1>{selected.display}</h1>
            <h1 className="tracking-widest text-xs">EXECUTION</h1>
          </div>
        </div>
      ) : (
        <div
          className="h-22.5 cursor-pointer rounded-xl border border-zinc-600 transition flex flex-col justify-between bg-[#1d232a]"
          onClick={() => modal2.current!.showModal()}
        >
          <div className="flex justify-end p-5 mt-auto">
            <h2 className="text-lg">Select Execution Layer</h2>
          </div>
        </div>
      )}

      <dialog ref={modal2} id="my_modal_2" className="modal">
        <div
          className={`modal-box ${theme === "dark" ? "bg-white" : "bg-black"}`}
        >
          <h1 className="text-xl font-black">Select an Execution Layer</h1>
          <div className="mt-4 border rounded-xl p-2 overflow-y-auto max-h-[20rem]">
            {layers.map((layer) => (
              <div
                key={layer.name}
                className="p-3 cursor-pointer transition flex items-center justify-between rounded-lg"
                onClick={() => {
                  setSelected(layer);
                  setExecutionLayer(layer);
                  modal2.current.close();
                }}
              >
                <div className="flex items-center space-x-2">
                  {/* <img src={getIconUrl(layer.icon)  } className="w-5 h-5" /> */}
                  {/* <p className="underline">1</p> */}
                  <h1 className="font-bold">{layer.display}</h1>
                </div>
                {selected == layer && <CheckIcon className="w-5 h-5" />}
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}

export default AddExecutionLayer;
