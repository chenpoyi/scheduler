import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // console.log(prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.

    const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
  // 3. Click the "Delete" button on the booked appointment.

    fireEvent.click(getByAltText(appointment, "Delete"));
    //console.log(prettyDOM(appointment));
  // 4. Check that the confirmation message is shown.

    expect(getByText(appointment, "Confirm")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.

    fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));
  // 7. Wait until the element with the "Add" button is displayed.

    expect(getByAltText(appointment, "Add")).toBeInTheDocument();
   

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
     // 1. Render the Application.

     const { container } = render(<Application />);
     // 2. Wait until the text "Archie Cohen" is displayed.
   
       await waitForElement(() => getByText(container, "Archie Cohen"));
   
       const appointments = getAllByTestId(container, "appointment");
       const appointment = appointments[1];
     // 3. Click the "Edit" button on the booked appointment.
   
       fireEvent.click(getByAltText(appointment, "Edit"));
       //console.log(prettyDOM(appointment));

       fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: {value: "Paul Chen"}
      });

      
      fireEvent.click(getByText(appointment, "Save"));

      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      await waitForElement(() => getByText(appointment, "Paul Chen"));
      expect(getByText(appointment, "Paul Chen")).toBeInTheDocument();
  
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  
  
  
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
  
    const { container } = render(<Application />);
  
      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      // console.log(prettyDOM(container));
  
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
  
      fireEvent.click(getByAltText(appointment, "Add"));
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: {value: "Lydia Miller-Jones"}
      });
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
      fireEvent.click(getByText(appointment, "Save"));
  
      expect(getByText(appointment, "Saving")).toBeInTheDocument();

      await waitForElement(() => getByText(appointment, "Error"));
      expect(getByText(appointment, "Error")).toBeInTheDocument();

  
  
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
  
    // 1. Render the Application.

    const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
  // 3. Click the "Delete" button on the booked appointment.

    fireEvent.click(getByAltText(appointment, "Delete"));
    //console.log(prettyDOM(appointment));
  // 4. Check that the confirmation message is shown.

    expect(getByText(appointment, "Confirm")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.

    fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();


  
  
  });
});


