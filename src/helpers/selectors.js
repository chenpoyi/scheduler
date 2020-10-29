export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  //console.log("days: ", state.days);
  
  if(state.days.length === 0 ){
    return [];
  }
  const filteredIndices = state.days.filter(dayItem => dayItem.name === day);
  if(filteredIndices.length === 0){
    return [];
  }
  const filteredAppointments = filteredIndices[0].appointments.map(index => state.appointments[index]
  );
  return filteredAppointments;
}