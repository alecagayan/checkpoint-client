import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AttendeeTable from '../components/AttendeeTable';
import { closeMeeting, getAttendees, getMeeting } from '../API';
import { getToken } from '../App';

function KioskLauncher(props) {

  const navigate = useNavigate();

  if (props.data.closetime === "") {
    return (
      <div>
        <button className="normalbutton" onClick={() => {
          sessionStorage.setItem('kiosk', 'true');
          navigate(`/checkin/${props.data.id}`);
        }}>Launch Check-In Kiosk</button>
        <p>The Check-In Kiosk allows members to check-in/check-out for the meeting. Your current session will be put in a limited-access mode to prevent unintended access to the admin interface.</p>
      </div>
    );
  }
  return <></>;
}

function CloseButton(props) {

  const navigate = useNavigate();

  if (props.data.closetime === "") {
    return (
      <div>
        <button className="dangerbutton" onClick={() => {
          closeMeeting({
            meetingId: props.data.id,
            token: getToken()
          });
          navigate(`/meetings`);
        }}>Close Meeting</button>
        <p>Clicking on the "Close Meeting" button will end the meeting and automatically check-out all attendees. Make sure that all attending members have checked-in as this operation cannot be undone! </p>
      </div>
    );
  }
  return <></>;
}


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
  }, [meetingId]);

  useEffect(() => {
    const fetchMeetingData = async () => {
      const data = await getMeeting(meetingId);
      setMeetingData(data);
    }
    fetchMeetingData();
  }, [meetingId]);

  return (
    <div className="main">
      <h2>Meeting Details</h2>
      <div className="panel-container">
      <div className="panel">
      <p>Meeting ID: {meetingId}
      <p>Meeting Date: {meetingData?.opentime}</p>
      <button style={{float: "right"}} className={meetingData?.next_meeting_id ? "normalbutton" : "disabledbutton"} onClick={() => {
        if (meetingData.next_meeting_id)
          navigate(`/meeting/${meetingData.next_meeting_id}`);
      }}>Next</button> 
      <button style={{float: "right"}} className={meetingData?.prev_meeting_id ? "normalbutton" : "disabledbutton"} onClick={() => {
        if (meetingData.prev_meeting_id)
          navigate(`/meeting/${meetingData.prev_meeting_id}`);
      }}>Prev</button></p>
      <p>Meeting Status: {meetingData.closetime === "" ? "Open" : "Closed"}</p>
      <KioskLauncher data={meetingData}/>
      <CloseButton data={meetingData}/>
      </div>

      <div className="panel">
      <AttendeeTable data={attendeeData} />
      </div>
      </div>

    </div>


  );
}
