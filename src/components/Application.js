import React, {useEffect, useState} from "react";
import axios from "axios"
import "components/Application.scss";
import Appointment from "components/Appointment/index"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import DayList from "components/DayList"

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
    
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Paul Chen",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
    
//   }
// ];

export default function Application(props) {
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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
 
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
  const AppointmentItems = dailyAppointments.map((appointment) => {
    console.log(appointment);
    const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  

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

  

  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            key={state.day}
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {AppointmentItems}
        <Appointment key="last" time="5pm" bookInterview={bookInterview}/>
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
