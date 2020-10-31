import { useState } from "react";
const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  
  const transition = (mode, replace = false) => {
    console.log("HISTORY: ", history);
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
    setMode(mode);
  };
  const back = () => {
    const newHistory = [...history];
    if (history.length > 1) {
      newHistory.pop();
    }
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };
  return { mode, transition, back };
};
export default useVisualMode;



// import { useState } from "react";

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   const transition = function (newMode, replace = false) {
//     // console.log("NEW MODE: ", newMode);
//     console.log("BEFORE HISTORY: ", history);
//     // console.log("REPLACE: ", replace);

//     if(replace){
      
//       history.pop();
      
//       // console.log("After replace: ", history);  
//     }
//     replace && setHistory([...history]);

//     setHistory((prev) => [...prev, newMode]);
//     setMode(newMode);
//     // console.log("HISTORY: ", history);
//   };

//   const back = function () {
//     // console.log("BACKING");
    
//     if(history.length > 1){
//       const popped = history.slice(0, history.length - 1)
//       setHistory([...popped]);
//       const last = history[history.length-2];
//       setMode(last);
//     }
//     // console.log(history);
//   };
//   //console.log("HISTORY: ", history)
//   return { mode, transition, back };
// }
