import {useState} from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = function(newMode, replace = false){
    setMode(newMode);
    {replace&&
      history.pop();
    }
    setHistory(history.concat([newMode]));
    
  };

  const back = function(){
    {
      history.length > 1 &&
      history.pop();
      setHistory([...history]);
      const last = history[history.length - 1];
      setMode(last);
    }
  }

  return { mode, transition, back };
}