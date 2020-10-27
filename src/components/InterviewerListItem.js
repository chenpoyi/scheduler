import React from "react";
import "components/InterviewerListItem.scss"
const classnames = require('classnames');

export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classnames({
    "interviewers__item--selected": props.selected
  });
  const InterviewersImageClass = classnames("interviewers__item-image")

  return (
    <li 
    className={InterviewerListItemClass}
    onClick={props.setInterviewer}>

      <img
        className={InterviewersImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
