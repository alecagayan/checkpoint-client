import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AttendeeTable from '../components/AttendeeTable';
import { closeMeeting, getAttendees } from '../API';
import { getToken } from '../App';

export default function MeetingDetails() {
  let { meetingId } = useParams();

  const [meetingData, setMeetingData] = useState({});
  const [attendeeData, setAttendeeData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendeeData = async () => {
      const data = await getAttendees(meetingId);
      setAttendeeData(data);
    };
    fetchAttendeeData();
  }, []);


  return (
      <div className="main">
        <h2>Meeting Details</h2>
        <p>Meeting ID: {meetingId}</p>

        {/* check into meeting button */}
        <button className="normalbutton" onClick={() => {
          sessionStorage.setItem('kiosk', 'true');
          navigate(`/checkin/${meetingId}`);
        }}>Launch Check-In Kiosk</button>
        <p>The Check-In Kiosk allows members to check-in/check-out for the meeting. Your current session will be put in a limited-access mode to prevent unintended access to the admin interface.</p>

        <br/>
        
        <AttendeeTable data={attendeeData} />

        <br/>

        <button className="dangerbutton" onClick={() => {
          closeMeeting({
            meetingId: meetingId,
            token: getToken()
          });
          navigate(`/meetings`);
        }}>Close Meeting</button>


      </div>


  );
}
