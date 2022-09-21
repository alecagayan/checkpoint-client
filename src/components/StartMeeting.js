import React from "react";
import { getToken } from "../App";
import { startMeeting } from "../API";
import { useNavigate } from "react-router-dom";

async function handleStartMeeting(navigate) {
  const result = await startMeeting({
    token: getToken()
  });

  if (result.meeting) {
    navigate(`/meeting/${result.meeting}`);
  }
  else {
    alert("Failed to start meeting, please check there is not a meeting already open!");
  }
}

export default function StartMeeting() {
  const navigate = useNavigate();
  return (
    <button className="normalbutton" onClick={() => handleStartMeeting(navigate)}>Start New Meeting</button>
  );
}