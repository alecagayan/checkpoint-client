import React from "react";

async function startMeeting(meetingData) {
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



class StartMeeting extends React.Component {
    
    handleStartMeeting = async e => {    
        e.preventDefault();
        const result = await startMeeting({});
    }
        
    render () {
        return (
            <button onClick={this.handleStartMeeting}>Start Meeting</button>
        );
    }
    }

    export default StartMeeting;