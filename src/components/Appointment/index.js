import React from "react";
//Import components within the Appointment component
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
//Import styles
import "components/Appointment/styles.scss";
//Import custom hook
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //alert("HELLO");
    transition(SAVING);
    
    props.bookInterview(props.id, interview)
    .then(()=>{
      transition(SHOW)
    })
    .catch(()=>{
      transition(ERROR_SAVE, true)
    })
  }

  function remove() {
    
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }

  function confirmRemove() {
    transition(CONFIRM);
  }

   
  //props.bookInterview(props.id, props.interview);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={()=>transition(EDIT)}
          onDelete={confirmRemove}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === EDIT && <Form 
      interviewers={props.interviewers} 
      name={props.interview.student} 
      interviewer={props.interview.interviewer.id} 
      onCancel={back} 
      onSave={save}/>}
      {mode === SAVING && (
        <Status message={"Saving"}/>
      )}
      {mode === DELETING && (
        <Status message={"Deleting"}/>
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={remove}/>
      )}
      {mode === ERROR_SAVE && (
        <Error message={"There is an error while saving."} onClose={back}/>
      )}
      {mode === ERROR_DELETE && (
        <Error message={"There is an error while deleting."} onClose={back}/>
      )}
    </article>
  );
}
