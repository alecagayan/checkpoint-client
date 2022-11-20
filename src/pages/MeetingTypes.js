import React from 'react';
import MeetingTypesTable from '../components/MeetingTypesTable';
import { getMeetingTypes } from '../API';

class MeetingTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meetingTypesData: [],
      IsApiError: false
    }
    
  }

  componentDidMount() {
    getMeetingTypes()
        .then(
            (result) => {
                this.setState({
                    meetingTypesData: result
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
            <h2>Meeting Types</h2>
            <p>All of the meeting types in your organization.</p>
            <div className='panel'>
            <MeetingTypesTable data={this.state.meetingTypesData} />
            {/* <NewMeetingType /> */}

            </div>
        </div>
    );
  }
}

export default MeetingTypes;