import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
} from "reducers/application";


const defaultState = {
  day: "Monday",
  days: [],
  appointments: [],
  interviewers: [],
  // you may put the line below, but will have to remove/comment hardcoded appointments variable
  //appointments: {}
};
const useApplicationData = (i) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const setDay = (day) => dispatch({ type: SET_DAY, value: day });
  // const setDays = (days) =>
  //   dispatch({ type: SET_APPLICATION_DATA, value: { days } });
  const setState = (newState) =>
    dispatch({ type: SET_APPLICATION_DATA, value: newState });
  // const useApplicationData = (i) => {
  //   const [state, setState] = useState({
  //     day: "Monday",
  //     days: [],
  //     appointments: [],
  //     interviewers: []
  //     // you may put the line below, but will have to remove/comment hardcoded appointments variable
  //     //appointments: {}
  //   });

  //   const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
  //   //... your code here ...
  //   setState(prev => ({ ...prev, days }));
  // }

  function bookInterview(id, interview) {
    console.log("INTERVIEW: ", state.appointments[id].interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayIndex = getDayIndex(state.day);
    let day;
    if(state.appointments[id].interview){
      day = {
        ...state.days[dayIndex],
      };
    } else {
      day = {
        ...state.days[dayIndex],
        spots: state.days[dayIndex].spots - 1,
      };
    }

    

    const days = [...state.days];
    days[dayIndex] = day;

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState({ ...state, appointments, days });
      });
  }

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayIndex = getDayIndex(state.day);

    const day = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + 1,
    };

    const days = [...state.days];
    days[dayIndex] = day;

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({ ...state, appointments, days });
    });
  };

  const getDayIndex = function (day) {
    const match = (element) => element.name === day;
    return state.days.findIndex(match);
  };

  useEffect(() => {
    // const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)

    // webSocket.onopen = function (event) {
    //   webSocket.send("PING"); 
    // };
    // webSocket.onmessage = function(event){
    // }

    // webSocket.onmessage = function (event) {
    // }
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });

    //});
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;
