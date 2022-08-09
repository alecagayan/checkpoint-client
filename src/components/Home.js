import React from 'react';
import { useNavigate } from "react-router-dom";
import UserTable from './UserTable';
import MeetingTable from './MeetingTable';
import AddUser from './AddUser';
import StartMeeting from './StartMeeting';


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


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      meetingData: [],
      IsApiError: false
    }
    
  }
  
  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + "/rbapi/users")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    userData: result
                });
                //console.log(result);
            },
            (error) => {
                this.setState({ IsApiError: true });
            }
        )

    fetch(process.env.REACT_APP_API_URL + "/rbapi/meetings")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    meetingData: result
                });
                //console.log(result);
            }, 
            (error) => {
                this.setState({ IsApiError: true });
            }  
        )

  }

  render () {

    return(
        <React.Fragment>
            <h2>Home</h2>
            <p>Welcome to the Checkpoint!</p>
            <UserTable data={this.state.userData} />
            <AddUser />
            <br/>
            <br/>
            <MeetingTable data={this.state.meetingData} />
            <StartMeeting />    
            <br/>
            <br/>
            <LogoutButton />
            <br/>
            <br/>
            <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
        </React.Fragment>
    );
  }
}

export default Home;