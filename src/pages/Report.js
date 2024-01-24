import React from 'react';
import { useNavigate } from "react-router-dom";
import ReportUserTable from '../components/ReportUserTable';
import { getRawDataByDate, getReportByDate } from '../API';
import { CSVLink } from "react-csv";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Report extends React.Component {

  
  constructor(props) {

    const start = new Date();
    start.setDate(start.getDate()-90);
    super(props);

    this.state = {
      userData: [],
      meetingData: [],
      rawData: [],
      IsApiError: false,
        startDate: start,
        endDate: new Date()
    }

    this.onChange = this.onChange.bind(this);

        if(start && this.state.endDate) {
      getReportByDate(start, this.state.endDate)
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
      getRawDataByDate(start, end)
      .then(
        (result) => {
            this.setState({
                rawData: result
                
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
            <div className='panel'>
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
            <CSVLink data={this.state.rawData} filename="rawdata.csv" className="normalbutton">Download Raw Data</CSVLink>

        </div>
    );
  }
}

export default Report;