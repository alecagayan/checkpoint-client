import React from 'react';
import { useNavigate } from "react-router-dom";
import UserTable from './UserTable';
import MeetingTable from './MeetingTable';
import AddUser from './AddUser';
import StartMeeting from './StartMeeting';
import AttendeeTable from './AttendeeTable';


function LogoutButton(props) {
  const navigate = useNavigate();
  return (
      <button onClick={() => { 
          sessionStorage.removeItem('token');
          navigate('/login');
      }
  }>Logout</button>
  );
}


class MeetingReport extends React.Component {
  constructor(props) {
    super(props);
    

    this.state = {
      attendeeData: [],
      meetingData: [],
      IsApiError: false
    }
    
  }
  
  
  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + "/rbapi/attendees?meetingId=" + "4")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    attendeeData: result
                });
                console.log(result);
            },
            (error) => {
                this.setState({ IsApiError: true });
            }
        )
    }

  render () {

    return(
        <React.Fragment>
            <h2>Meeting Report</h2>
            <p>Welcome to the meeting report!</p>
            {/* TODO: Show meeting data here (duration, opening time, attendee count) */}
            <AttendeeTable data={this.state.attendeeData} />
        </React.Fragment>
    );
  }
}

export default MeetingReport;