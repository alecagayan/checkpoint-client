import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import MeetingTable from '../components/MeetingTable';
import { getMeetingType, getMeetingsWithType, updateMeetingType } from '../API';
import { getToken } from '../App';
import Toast from '../components/toast/Toast';


export default function MeetingTypeDetails() {
    let { meetingTypeId } = useParams();

    const [meetingTypeData, setMeetingTypeData] = useState({});
    const [meetingData, setMeetingData] = useState([]);

    const [toastList, setToastList] = useState([]);
    let toastProperties = null;

    console.log(meetingTypeId);


    useEffect(() => {
        const fetchMeetingTypeData = async () => {
            const data = await getMeetingType(meetingTypeId);
            setMeetingTypeData(data);
        };
        fetchMeetingTypeData();
    }, [meetingTypeId]);

    useEffect(() => {
        const fetchMeetingData = async () => {
            const data = await getMeetingsWithType(meetingTypeId);
            setMeetingData(data);
        }
        fetchMeetingData();
    }, [meetingTypeId]);

    const handleSubmit = async e => {
        e.preventDefault();

        const result = await updateMeetingType({
            id: meetingTypeData.id,
            name: meetingTypeData.name,
            multiplier: meetingTypeData.multiplier,
            token: getToken()
        });

        if (result) {
            // show success toast
            showToast('success', 'Meeting type updated successfully.');
        } else {
            // show error toast
            showToast('error', 'Failed to update meeting type.');
        }
    }

    const handleChange = (event) => {
        setMeetingTypeData({ ...meetingTypeData, [event.target.name]: event.target.value });
    };

    const showToast = (type, msg) => {
        switch (type) {
            case 'success':
                toastProperties = {
                    id: toastList.length + 1,
                    title: 'Success',
                    description: msg,
                    backgroundColor: '#0066ff'
                }
                break;
            case 'error':
                toastProperties = {
                    id: toastList.length + 1,
                    title: 'Error',
                    description: msg,
                    backgroundColor: '#d9534f'
                }
                break;
            default:
                toastProperties = [];
        }
        setToastList([...toastList, toastProperties]);
    };


    return (
        <div className="main">
            <h2>Meeting Type Details</h2>
            <div className="panel">
                <p>Meeting Type ID: {meetingTypeData.id}</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="entry-field">
                            <label className="form-label">Name:</label>
                            <input className="form-input" type="text" name="name" value={meetingTypeData.name} onChange={handleChange} />
                        </div>
                        <div className="entry-field">
                            <label className="form-label">Multiplier:</label>
                            <input className="form-input" type="text" name="email" value={meetingTypeData.multiplier} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <br />
                        <button className='normalbutton'>Update Meeting Type</button>
                    </div>

                </form>
            </div>
            <div className="panel">
                <MeetingTable data={meetingData} />
            </div>
            <Toast toastlist={toastList} position="top-right" setList={setToastList} />
        </div>
    );
}