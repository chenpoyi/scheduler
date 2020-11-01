import { useState, useEffect, useReducer } from "react";
import axios from "axios"

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.value}
    case SET_APPLICATION_DATA:
      return action.value
    case SET_INTERVIEW: {
      return /* insert logic */
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const defaultState = {
      day: "Monday",
      days: [],
      appointments: [],
      interviewers: []
      // you may put the line below, but will have to remove/comment hardcoded appointments variable
      //appointments: {}
    };
const useApplicationData = (i) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const setDay = day => dispatch({type: SET_DAY, value: day});
  const setDays = days => dispatch({type: SET_APPLICATION_DATA, value: {days}});
  const setState = newState =>{
    console.log("NEW STATE: ", newState)
    dispatch({type: SET_APPLICATION_DATA, value:newState})
  } ;
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log("appointment: ", appointment)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("appointments: ", appointments)
    
    console.log("Days: ", state.days);  
    const dayIndex = getDayIndex(state.day);

    const day = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots - 1
    }

    const days = [
      ...state.days
    ];
    days[dayIndex] = day;
   
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((response)=>{
      setState({...state, appointments, days});
    });
  }

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayIndex = getDayIndex(state.day);

    const day = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + 1
    }

    const days = [
      ...state.days
    ];
    days[dayIndex] = day;
    
    return axios.delete(`/api/appointments/${id}`)
    .then((response)=>{
      setState({...state, appointments, days});
    });
  }

  const getDayIndex = function(day){
  //   for(let index in state.days){
  //     console.log(state.days[index]);
  //     for(let appointment in state.days[index].appointments){
  //       if(state.days[index].appointments[appointment]===id){
  //         console.log(index);
  //         return index;
  //       }
  //   }
  // }
  const match = (element) => element.name = day;
  return state.days.findIndex(match);
}

  useEffect(()=>{
    //axios.get('/api/days').then(response => {
      // setDays(response.data)
      // console.log(response.data);
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ]).then((all) => {
        console.log("STATE: ", state)
        setState({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data});
        console.log("AFTER STATE: ", state)
      });

    //});
  },[]);


  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;
