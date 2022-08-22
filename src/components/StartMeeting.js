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
}

export default function StartMeeting() {
  const navigate = useNavigate();
  return (
    <button onClick={() => handleStartMeeting(navigate)}>Start Meeting</button>
  );
}