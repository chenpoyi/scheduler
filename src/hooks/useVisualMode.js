//Code with the help from AR
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
    setMode(newMode);
  };
  const back = function () {
    if (history.length > 1) {
      const newHistory = [...history];
      if (history.length > 1) {
        newHistory.pop();
      }
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };
  return { mode, transition, back };
}
