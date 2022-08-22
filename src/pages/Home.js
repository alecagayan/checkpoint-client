import React from 'react';
import { useNavigate } from "react-router-dom";

import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  BarController,
  LineElement,
  Tooltip,
  BarElement,
  PointElement,
  LineController
} from 'chart.js';

import { BarChart }  from '../components/charts/BarChart';
import { LineChart } from '../components/charts/LineChart';
import { getRecentMeetings, getTopAttendees } from '../API';

Chart.register(
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LineController
);


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


    getRecentMeetings(10)
      .then(
        (result) => {
          const chartData = {
            labels: result.map((entry) => entry.meeting_time.substring(0, 10)),
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

    getTopAttendees(start, end, 5)
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
        <LineChart chartData={this.state.meetingData} />
        </div>
        <div className='chart'>
          <p>Top attendees:</p>
        <BarChart chartData={this.state.attendeeData} />
        </div>
        </div>
      </div>
    );
  }
}

export default Home;