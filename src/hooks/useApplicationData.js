import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA } from "reducers/application";

const defaultState = {
  day: "Monday",
  days: [],
  appointments: [],
  interviewers: [],
};
//Retrieves and sends all data from API, make changes to state"

const useApplicationData = (i) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  //Sets the current day being displayed
  const setDay = (day) => dispatch({ type: SET_DAY, value: day });
  //Sets the state 
  const setState = (newState) =>
    dispatch({ type: SET_APPLICATION_DATA, value: newState });
  //For creating or editing interview: Makes axios request, changes state to reflect change.
  function bookInterview(id, interview) {
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
    //Only decrease spots remaining when creating new interview
    if (state.appointments[id].interview) {
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
    //Request to API for updated interview data
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState({ ...state, appointments, days });
      });
  }
  //Cancel interview: Makes axios request, and changes state to reflect change
  const cancelInterview = function (id) {
    //Sets interview to null for the specific appointment object
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

  //Helper function to retrieve the index of current day in the days array
  const getDayIndex = function (day) {
    const match = (element) => element.name === day;
    return state.days.findIndex(match);
  };

  //Retrieves updated data from api 
  useEffect(() => {
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
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;
