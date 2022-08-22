import { getToken } from "./App";

export async function startMeeting(meetingData) {
    console.log("startMeeting: ", meetingData);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/startmeeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(meetingData)
    })
      .then(data => data.json())
      
   }


export async function closeMeeting(meetingData) {
    console.log("closeMeeting: ", meetingData);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/closemeeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(meetingData)
    })
      .then(data => data.json())
      
   }

//get request for attendees by meeting id
export async function getAttendees(meetingId) {
    console.log("getAttendees: ", meetingId);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/attendees?meetingId=' + meetingId)
      .then(data => data.json())      
   }

   


   
