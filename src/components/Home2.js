import { useEffect, useState } from 'react';

//import 'chart.js/auto';
//import { Chart } from 'react-chartjs-2';

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


export default function Home2() {
  useEffect(() => {
    const fetchMeetingData = async () => {

      const res = await fetch(process.env.REACT_APP_API_URL + "/rbapi/recentmeetings?limit=10");
      const data = await res.json();
      //console.log(data);
      setMeetingData({
        labels: data.map((entry) => entry.meeting_time),
        datasets: [
          {
            label: 'Number of Attendees',
            data: data.map((entry) => entry.attendee_count),
            backgroundColor: [
              "#006600",
            ]
          }
        ]
      });
    };
    fetchMeetingData();
  } , []);

  useEffect(() => {
    const fetchAttendeeData = async () => {

      const start = new Date();
      start.setDate(start.getDate() - 30);
      
      const end = new Date();
      end.setDate(end.getDate() + 1);

      const res = await fetch(process.env.REACT_APP_API_URL + "/rbapi/topattendees?limit=5&startDate="+ start.toISOString().substring(0, 10) + "&endDate=" + end.toISOString().substring(0, 10));
      const data = await res.json();
      //console.log(data);
      setAttendeeData({
        labels: data.map((entry) => entry.name),
        datasets: [
          {
            label: 'Attendance Percentage',
            data: data.map((entry) => entry.attendee_count),
            backgroundColor: [
              "#aa6600",
            ]
          }
        ]
      });
    };
    fetchAttendeeData();
  } , []);
  

  const [meetingData, setMeetingData] = useState({});
  const [attendeeData, setAttendeeData] = useState({});

  return (
    <div className='main'>
      <h2>Home</h2>
      <p>Welcome to Checkpoint!</p>
      <div className='chart-container'>
        <div className='chart'>
          <p>Recent meeting attendance:</p>
        <BarChart chartData={meetingData} />
        </div>
        <div className='chart'>
          <p>Top attendees:</p>
        <BarChart chartData={attendeeData} />
        </div>
      </div>
    </div>
  );
}
