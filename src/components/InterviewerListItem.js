import React from "react";
import "components/InterviewerListItem.scss"
const classnames = require('classnames');

export default function InterviewerListItem(props) {
  //Adds class name if current interviewer is selected
  const InterviewerListItemClass = classnames({
    "interviewers__item--selected": props.selected
  });
  return (
    <li 
    className={InterviewerListItemClass}
    onClick={props.setInterviewer}>
      <img
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
