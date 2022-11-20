import React from "react";
import { useNavigate } from "react-router-dom";

export default function MeetingTypesButton() {
  const navigate = useNavigate();
  return (
    <button className="checkinbutton" onClick={() => navigate('/meetingtypes')}>View Meeting Types</button>
  );
}