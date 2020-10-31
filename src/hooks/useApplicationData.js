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
    
      
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((response)=>{
      console.log('response: ',response);
      setState({...state, appointments});
      console.log("STATE: ", state);
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

    return axios.delete(`/api/appointments/${id}`)
    .then((response)=>{
      console.log('response: ',response);
      setState({...state, appointments});
      console.log("STATE: ", state);
    });
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
