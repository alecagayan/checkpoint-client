import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ReportUserTable from '../components/ReportUserTable';
import MeetingTable from '../components/MeetingTable';
import AddUser from '../components/AddUser';
import StartMeeting from '../components/StartMeeting';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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


class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      meetingData: [],
      IsApiError: false,
        startDate: new Date(),
        endDate: new Date()
    }

    this.onChange = this.onChange.bind(this);
  }

  
  onChange = (dates) => {
    const [start, end] = dates;
    this.setState({startDate: start});
    this.setState({endDate: end});

    if(start && end) {
      fetch(process.env.REACT_APP_API_URL + "/rbapi/reportbydate?startDate=" + start.toISOString().substring(0, 10) + "&endDate=" + end.toISOString().substring(0, 10))
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    userData: result
                });
                console.log(result);
            }, 
            (error) => {
                this.setState({ IsApiError: true });
            }  
        )
    }
  }

  
//   componentDidMount() {
//     // fetch(process.env.REACT_APP_API_URL + "/rbapi/users")
//     //     .then(res => res.json())
//     //     .then(
//     //         (result) => {
//     //             this.setState({
//     //                 userData: result
//     //             });
//     //             //console.log(result);
//     //         },
//     //         (error) => {
//     //             this.setState({ IsApiError: true });
//     //         }
//     //     )

//     fetch(process.env.REACT_APP_API_URL + "/rbapi/meetings")
//         .then(res => res.json())
//         .then(
//             (result) => {
//                 this.setState({
//                     meetingData: result
//                 });
//                 //console.log(result);
//             }, 
//             (error) => {
//                 this.setState({ IsApiError: true });
//             }  
//         )

//   }

  render () {

    return(
        <div className='main'>
            <h2>Report</h2>
            Select a date range:
            <DatePicker
                selected={this.state.startDate}
                onChange={this.onChange.bind(this)}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                selectsRange
            />
            <ReportUserTable data={this.state.userData} />
        </div>
    );
  }
}

export default Report;