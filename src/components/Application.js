import React, {useEffect, useState} from "react";
import axios from "axios"
import "components/Application.scss";
import Appointment from "components/Appointment/index"
import { getAppointmentsForDay } from "helpers/selectors";
import DayList from "components/DayList"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Paul Chen",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [
      {
        id: 1,
        time: "12pm",
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          }
        }
      },
      {
        id: 3,
        time: "2pm",
        
      },
      {
        id: 4,
        time: "3pm",
        interview: {
          student: "Paul Chen",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          }
        }
      },
      {
        id: 5,
        time: "4pm",
        
      }
    ]
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    //appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
  //   //... your code here ...
  //   setState(prev => ({ ...prev, days }));
  // }

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  useEffect(()=>{
    //axios.get('/api/days').then(response => {
      // setDays(response.data)
      // console.log(response.data);
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ]).then((all) => {
        console.log("DAYS: ", all[1])
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
      });

    //});
  },[]);

  

  const AppointmentItems = dailyAppointments.map((appointment)=>(
    <Appointment
    key={appointment.id} {...appointment}/>
  ));
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
        <Appointment key="last" time="5pm" />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
