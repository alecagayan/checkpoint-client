import React from 'react';
import { useNavigate } from "react-router-dom";
import ReportUserTable from '../components/ReportUserTable';
import { getReportByDate } from '../API';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
      getReportByDate(start, end)
        .then(
            (result) => {
                this.setState({
                    userData: result
                });
              }, 
            (error) => {
                this.setState({ IsApiError: true });
            }  
        )
    }
  }


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