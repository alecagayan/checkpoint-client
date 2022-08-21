import React from 'react';
import { useNavigate } from "react-router-dom";

import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
//  LineController,
  BarController,
  LineElement,
//  PointElement,
  Tooltip,
  BarElement
} from 'chart.js';

import { BarChart }  from './charts/BarChart';

Chart.register(
//  LineController,
//  PointElement,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarController,
  BarElement
);

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
      meetingData: {},
      attendeeData: {},
      IsApiError: false
    }

  }

  componentDidMount() {

    const start = new Date();
    start.setDate(start.getDate() - 30);
      
    const end = new Date();
    end.setDate(end.getDate() + 1);


    fetch(process.env.REACT_APP_API_URL + "/rbapi/recentmeetings?limit=10")
      .then(res => res.json())
      .then(
        (result) => {
          const chartData = {
            labels: result.map((entry) => entry.meeting_time),
            datasets: [
              {
                label: 'Number of Attendees',
                data: result.map((entry) => entry.attendee_count),
                backgroundColor: [
                  "#006600", 
                ]
              }
            ]
          }

          this.setState({
            meetingData: chartData
          });

        },
        (error) => {
          this.setState({ IsApiError: true });
        }
      )

      fetch(process.env.REACT_APP_API_URL + "/rbapi/topattendees?limit=5&startDate="+ start.toISOString().substring(0, 10) + "&endDate=" + end.toISOString().substring(0, 10))
      .then(res => res.json())
      .then(
        (result) => {
          const chartData = {
            labels: result.map((entry) => entry.name),
            datasets: [
              {
                label: 'Attendance Percentage',
                data: result.map((entry) => entry.attendee_count),
                backgroundColor: [
                  "#aa6600", 
                ]
              }
            ]
          }

          this.setState({
            attendeeData: chartData
          });

        },
        (error) => {
          this.setState({ IsApiError: true });
        }
      )

  }


  render() {

    return (
      <div className='main'>
        <h2>Home</h2>
        <p>Welcome to Checkpoint!</p>
        <div className='chart-container'>
        <div className='chart'>
          <p>Recent meeting attendance:</p>
        <BarChart chartData={this.state.meetingData} />
        </div>
        <div className='chart'>
          <p>Top attendees:</p>
        <BarChart chartData={this.state.attendeeData} />
        </div>
        </div>
        <div>
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
        </div>
      </div>
    );
  }
}

export default Home;