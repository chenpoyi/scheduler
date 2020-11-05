import React from "react";

import "components/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem(props) {
  //Adds class to component if selected or has no spots remaining
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  const formatSpots = function (spots) {
    //Handles different formatting for number of spots remaining
    if(spots === 0){
      return 'no spots remaining'
    } else if (spots === 1) {
      return '1 spot remaining'
    } else{
      return `${spots} spots remaining`
    }   
  }

  return (
    <li
    className = {dayClass} 
    onClick={() => props.setDay(props.name)}
    data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}