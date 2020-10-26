import React from "react";

import "components/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item");

  return (
    <li 
    className={classnames}
    onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
    <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}