import React from 'react';
import MeetingTable from '../components/MeetingTable';
import StartMeeting from '../components/StartMeeting';
import MeetingTypesButton from '../components/MeetingTypesButton';
import { getMeetings } from '../API';
import { Navigate, useNavigate } from 'react-router-dom';

class Meetings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meetingData: [],
      IsApiError: false
    }
    
  }

  componentDidMount() {
    getMeetings()
        .then(
            (result) => {
                this.setState({
                    meetingData: result
                });
            }, 
            (error) => {
                this.setState({ IsApiError: true });
            }  
        )

  }

  render () {

    return(
        <div className='main'>
            <h2>Meetings</h2>
            <p>Shows the most recent meetings. </p>
            <p>A meeting can be Open or Closed. Attendees can sign into a meeting only if it is Open. Closed meetings cannot be reopened.</p>
            <p>Check-In Kiosk can be launched from the meeting Details page. </p>
            <div className='panel'>
            <p>Type in a date to find a meeting:</p>
            <MeetingTable data={this.state.meetingData} />
            <StartMeeting />
            {/* button to navigate to meeting tables */}
            <MeetingTypesButton />

            </div>
        </div>
    );
  }
}

export default Meetings;