import algorithms from "@/constants/algorithms";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from "react";
import "./styles.css";
import { useTradeStore } from "@/states/trade.state";

function AddAlgorithm() {
  const modal2 = useRef<any>(null);

  const [selected, setSelected] = useState<any>(null);

  const setAlgorithm = useTradeStore((s: any) => s.setAlgorithm);

  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove(".theme-options");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add(".theme-options");
    }
  }, [theme]);

  return (
    <>
      {selected ? (
        <div
          className="h-25 cursor-pointer rounded-xl border border-zinc-600 transition flex flex-col justify-between theme-colors"
          onClick={() => modal2.current!.showModal()}
        >
          <div className="p-5 rounded-t-xl flex items-center justify-between">
            <h1>{selected.name}</h1>
            <h1 className=" tracking-widest text-xs">ALGORITHM</h1>
          </div>
          <div className="p-5 ">
            <p className="text-xs">{selected.description}</p>
          </div>
        </div>
      ) : (
        <div
          className="h-25 cursor-pointer rounded-xl border border-zinc-600 transition flex flex-col justify-between bg-[#1d232a]"
          onClick={() => modal2.current!.showModal()}
        >
          <div className="flex justify-end p-5 mt-auto">
            <h2 className="text-lg">Select Algorithm</h2>
          </div>
        </div>
      )}

      <dialog ref={modal2} id="my_modal_2" className="modal theme-options">
        <div
          className={`modal-box ${theme === "dark" ? "bg-white" : "bg-black"}`}
        >
          <h2 className="text-2xl">Select an Algorithm</h2>
          <div className="mt-4 border rounded-xl p-2 overflow-y-auto max-h-[20rem] ">
            {algorithms.map((algo) => (
              <div
                key={algo.name}
                className="p-3 cursor-pointer transition flex items-center justify-between rounded-lg"
                onClick={() => {
                  setSelected(algo);
                  setAlgorithm(algo.name);
                  modal2.current.close();
                }}
              >
                <div className="">
                  <h1 className="font-bold">{algo.name}</h1>
                  <p className="text-xs">{algo.description}</p>
                </div>
                {selected == algo && <CheckIcon className="w-5 h-5" />}
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}

export default AddAlgorithm;
