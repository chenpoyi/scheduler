import { useState, useEffect } from "react";
import axios from "axios"

const useApplicationData = (i) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    //appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });
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
    const dayIndex = getDayIndex(id);

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

    const dayIndex = getDayIndex(id);

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

  const getDayIndex = function(id){
    for(let index in state.days){
      console.log(state.days[index]);
      for(let appointment in state.days[index].appointments){
        if(state.days[index].appointments[appointment]===id){
          console.log(index);
          return index;
        }
    }
  }
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
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      });

    //});
  },[]);


  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;
