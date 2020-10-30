import React from "react";
//Import components within the Appointment component
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
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
  const CONFIRM = "CONFIRMING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(()=>{
      transition(SHOW)
    })
  }

  function remove() {
    
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(()=>{
      transition(EMPTY)
    })
  }
  function confirmRemove() {
    transition(CONFIRM);
  }

  //props.bookInterview(props.id, props.interview);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmRemove}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVING && (
        <Status message={"Saving Interview."}/>
      )}
      {mode === DELETING && (
        <Status message={"Deleting."}/>
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={remove}/>
      )}
    </article>
  );
}
