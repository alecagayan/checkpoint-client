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

        {/* close meeting button */}
        <button onClick={() => {
          closeMeeting({
            meetingId: meetingId,
            token: getToken()
          });
          navigate(`/meetings`);
        }}>Close Meeting</button>

        {/* check into meeting button */}
        <button onClick={() => {
          navigate(`/checkin/${meetingId}`);
        }}>Check In</button>
        <br/>
        <br/>
        
        <AttendeeTable data={attendeeData} />
      </div>


  );
}
