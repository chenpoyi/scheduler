import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const item = props.days.map((day) => (
    <DayListItem
      key={day.name}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));
  return <ul>{item}</ul>;
}
