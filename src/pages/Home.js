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
import AttendanceTable from '../components/AttendanceTable';  
import { getRecentMeetings, getAttendanceByTokenBetweenDates, getPercentagesByTokenBetweenDates, getTopAttendees } from '../API';
import { IfAdminRole, IfUserRole } from '../App';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

    const start = new Date();
    start.setDate(start.getDate()-30);
    super(props);

    this.state = {
      meetingData: {},
      attendeeMeetingData: {},
      attendeeHourData: {},
      attendanceData: [],
      percentageData: [],
      IsApiError: false,
      startDate: start,
      endDate: new Date()
    }

    this.onChange = this.onChange.bind(this);

    if (start && this.state.endDate) {
      getAttendanceByTokenBetweenDates(start, this.state.endDate)
        .then(
          (result) => {
            this.setState({
              attendanceData: result
            });
          },
          (error) => {
            this.setState({ IsApiError: true });
          }
        )

      getPercentagesByTokenBetweenDates(start, this.state.endDate)
        .then(
          (result) => {
            this.setState({
              percentageData: result
            });
          },
          (error) => {
            this.setState({ IsApiError: true });
          }
        )
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

  onChange = (dates) => {
    const [start, end] = dates;
    this.setState({startDate: start});
    this.setState({endDate: end});

    if (start && end) {
      getAttendanceByTokenBetweenDates(start, end)
          .then(
            (result) => {
              this.setState({
                  attendanceData: result
              });
            }, 
          (error) => {  
              this.setState({ IsApiError: true });
          }  
          )
      getPercentagesByTokenBetweenDates(start, end)
          .then(
            (result) => {
              this.setState({
                  percentageData: result
              });
            }, 
          (error) => {  
              this.setState({ IsApiError: true });
          }  
          )
  }
  }


  render() {

    return (
      // div with max width of 100% and overflow hidden
      <div className='main' style={ { maxWidth: '100%', overflow: 'hidden' } }>
      {/* <div className='main' > */}
        <h2>Home</h2>
        <p>Welcome to Checkpoint! <IfUserRole>View your attendance below.</IfUserRole></p>
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
        <IfUserRole>
        <div className="panel">
        <div className='panel'>
            Select a date range:
            <DatePicker
                selected={this.state.startDate}
                onChange={this.onChange.bind(this)}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                selectsRange

            />
                        <div className="entry-field">
                <label className="">Adjusted percentage:</label>
                {/* text is yellow if below 80 and red if below 60 */}
                <input className="form-input" type="text" name="percentage" value={this.state.percentageData} disabled="disabled" style={{color: this.state.percentageData < 60 ? '#EF476F' : this.state.percentageData < 80 ? '#FF914D' : 'green'}} />
            </div>
                <AttendanceTable data={this.state.attendanceData} />
            </div>
        </div>
        </IfUserRole>
        
      </div>      
    );
  }
}

export default Home;