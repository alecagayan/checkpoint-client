import React from 'react';
import { useNavigate } from "react-router-dom";

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
  

  render () {

    return(
        <div className='main'>
            <h2>Home</h2>
            <p>Welcome to Checkpoint!</p>
            <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
        </div>
    );
  }
}

export default Home;