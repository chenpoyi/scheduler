# Interview Scheduler
This project is an single-page application that allows users to add, edit and cancel interviews given the time slots and available interviewers. 

This modern client application is created using the React view library. It communicates with an API server to retrieve and store data. 

The testing of this project involve unit, integration and end-to-end testing. 

The purpose of this project was to learn to build and test a React application and is not intended for commercial use.

## Final Product

![](https://github.com/chenpoyi/scheduler/blob/master/docs/application.png)
The root shows the application with the default day set to Monday.

![](https://github.com/chenpoyi/scheduler/blob/master/docs/daylist.png)
The sidebar is a list showing all of the days available and the number of remaining spots in each.

![](https://github.com/chenpoyi/scheduler/blob/master/docs/form.png)
Clicking a vacant spot will bring up a form where the user can enter their name and select one of the available interviewers.

![](https://github.com/chenpoyi/scheduler/blob/master/docs/show.png)
Timeslots with booked interviews will display the name of the person and the name of the interviewer.

![](https://github.com/chenpoyi/scheduler/blob/master/docs/confirm.png)
The confirmation alert shows when user tries to delete an interview. 

![](https://github.com/chenpoyi/scheduler/blob/master/docs/error.png)
An error message shows when there is an error while saving or deleting an interview.



## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
