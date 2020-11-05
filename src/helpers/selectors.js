export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  
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

export function getInterviewersForDay(state, day) {
   //... returns an array of interviewers for that day
  
  if(!state.days.length){
    return [];
  }
  const filteredIndices = state.days.filter(dayItem => dayItem.name === day);
  if(filteredIndices.length === 0){
    return [];
  }
  const filteredAppointments = filteredIndices[0].interviewers.map(index => state.interviewers[index]
  );
  return filteredAppointments;
}

export function getInterview(state, interview) {
  //returns interview object given info for interview
  if(!interview) return null;

  const interviewObj = {};
  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}

