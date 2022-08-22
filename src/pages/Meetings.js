import React from 'react';
import MeetingTable from '../components/MeetingTable';
import StartMeeting from '../components/StartMeeting';
import { getMeetings } from '../API';

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
            <MeetingTable data={this.state.meetingData} />
            <StartMeeting />    
        </div>
    );
  }
}


export default Meetings;