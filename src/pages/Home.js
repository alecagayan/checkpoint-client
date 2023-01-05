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
import { getRecentMeetings, getReportByDate, getTopAttendees } from '../API';
import { IfAdminRole } from '../App';

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
      attendeeMeetingData: {},
      attendeeHourData: {},
      IsApiError: false
    }

  }

  componentDidMount() {

    const start = new Date();
    start.setDate(start.getDate() - 30);
      
    const end = new Date();
    end.setDate(end.getDate() + 1);

    //colors https://coolors.co/0066ff-ef476f-ffd166-06d6a0-cdc7e5


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
                  "#ef476f", 
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

    getTopAttendees(start, end, 10, "meetings")
      .then(
        (result) => {
          const chartData = {
            labels: result.map((entry) => entry.name),
            datasets: [
              {
                label: 'Attended Meetings (%)',
                data: result.map((entry) => entry.attendee_count),
                backgroundColor: [
                  "#06d6a0", 
                ]
              }
            ]
          }

          this.setState({
            attendeeMeetingData: chartData
          });

        },
        (error) => {
          this.setState({ IsApiError: true });
        }
      )

      getTopAttendees(start, end, 10, "hours")
      .then(
        (result) => {
          const chartData = {
            labels: result.map((entry) => entry.name),
            datasets: [
              {
                label: 'Attended Hours (%)',
                data: result.map((entry) => entry.attendee_count),
                backgroundColor: [
                  "#0066ff", 
                ]
              }
            ]
          }

          this.setState({
            attendeeHourData: chartData
          });

        },
        (error) => {
          this.setState({ IsApiError: true });
        }
      )

  }


  render() {

    return (
      // div with max width of 100% and overflow hidden
      <div className='main' style={ { maxWidth: '100%', overflow: 'hidden' } }>
      {/* <div className='main' > */}
        <h2>Home</h2>
        <p>Welcome to Checkpoint!</p>
        <IfAdminRole>
        {/* chart container div with overflow hidden */}
        <div className='chart-container'>
        <div className='chart'>
          <p>Recent meeting attendance:</p>
        <LineChart chartData={this.state.meetingData} />
        </div>
        <div className='chart'>
          <p>Top attendees by meeting:</p>
        <BarChart chartData={this.state.attendeeMeetingData} />
        </div>
        {/* <div className='chart'>
          <p>Top attendees by hour (beta):</p>
        <BarChart chartData={this.state.attendeeHourData} />
        </div> */}
        {/* <div data-tf-popover="HdgwAzhi" data-tf-button-color="#0445AF" data-tf-chat data-tf-medium="snippet" style={{ all: 'unset' }}></div><script src="//embed.typeform.com/next/embed.js"></script> */}
        </div>
        </IfAdminRole>
      </div>      
    );
  }
}

export default Home;