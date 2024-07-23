import tokens from "@/constants/tokens";
import { useTradeStore } from "@/states/trade.state";
import { getIconUrl } from "@/utils";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

function AddTokenPair() {
  const modal1 = useRef<any>(null);

  const [selectedPair, setSelectedPair] = useState<any>(null);

  const currentToken = useTradeStore((s: any) => s.currentToken);
  const setCurrentToken = useTradeStore((s: any) => s.setCurrentToken);

  const tokenList = useTradeStore((s: any) => s.tokenList);
  const setTokens = useTradeStore((s: any) => s.setTokens);
  const setTvParam = useTradeStore((s: any) => s.setTvParam);

  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("theme-colors");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("theme-colors");
    }
  }, [theme]);

  return (
    <>
      {selectedPair ? (
        <div
          className="h-20 cursor-pointer rounded-xl border border-zinc-600 transition flex flex-col justify-between theme-colors"
          onClick={() => modal1.current!.showModal()}
        >
          <div className="flex items-center justify-between p-5 rounded-t-xl ">
            <div className="flex items-center space-x-1">
              <img src={getIconUrl(selectedPair.token0)} className="w-5 h-5" />
              <span>{selectedPair.token0} -</span>
              <img src={getIconUrl(selectedPair.token1)} className="w-5 h-5" />
              <span>{selectedPair.token1}</span>
            </div>
            <h1 className="tracking-widest text-xs">PAIR</h1>
          </div>
          {/* <div className="flex justify-end p-2">
            <h2 className="text-xl font-bold">123.43</h2>
          </div> */}
        </div>
      ) : (
        <div
          className="h-20 hover:shadow-md border border-zinc-600 cursor-pointer rounded-xl transition flex flex-col justify-between bg-[#1d232a]"
          onClick={() => modal1.current!.showModal()}
        >
          <div className="flex justify-end p-5 mt-auto">
            <h2 className="text-lg">Select Pair</h2>
          </div>
        </div>
        // <div
        //   className="text-primary-100/80 border border-primary-400/60 shadow-md hover:shadow-primary-400 h-40 rounded-xl flex flex-col items-center justify-center space-y-3 cursor-pointer hover:bg-primary-400/10 transition"
        // >
        //   <PlusIcon className="w-6 h-6" />
        //   <h1>Add Token Pair</h1>
        // </div>
      )}

      <dialog ref={modal1} id="my_modal_1" className="modal">
        <div
          className={`modal-box ${theme === "dark" ? "bg-white" : "bg-black"}`}
        >
          <h1 className="text-xl">Select a Token Pair</h1>
          <div className="mt-4 border rounded-xl p-2 overflow-y-auto max-h-[20rem] ">
            {tokens.map((token) => (
              <div
                key={token.token0 + token.token1}
                className=" p-3 cursor-pointer transition flex items-center justify-between rounded-lg"
                onClick={() => {
                  setSelectedPair(token);
                  setCurrentToken(token);
                  setTokens([...tokenList, token.token0, token.token1]);
                  setTvParam(`${token.token0}/${token.token1}`);
                  modal1.current.close();
                }}
              >
                <div className="flex items-center space-x-1">
                  <img src={getIconUrl(token.token0)} className="w-5 h-5" />
                  <span>{token.token0} -</span>
                  <img src={getIconUrl(token.token1)} className="w-5 h-5" />
                  <span>{token.token1}</span>
                </div>
                {selectedPair == token && <CheckIcon className="w-5 h-5" />}
              </div>
            ))}
          </div>

          {/* <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div> */}
        </div>
      </dialog>
    </>
  );
}

export default AddTokenPair;
