//Code with the help from AR

import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    // console.log("NEW MODE: ", newMode);
    console.log("BEFORE HISTORY: ", history);
    // console.log("REPLACE: ", replace);

    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
    setMode(newMode);
    // console.log("HISTORY: ", history);
  };

  const back = function () {
    // console.log("BACKING");
    
    if(history.length > 1){
      const newHistory = [...history];
    if (history.length > 1) {
      newHistory.pop();
    }
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
    }
    // console.log(history);
  };
  //console.log("HISTORY: ", history)
  return { mode, transition, back };
}
