import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Toast from '../components/toast/Toast';
import PropTypes from 'prop-types';
import { getToken } from '../App';
import { checkinUser, checkinByUserToken } from '../API';
import QRCodeScanner from '../components/QRCodeScanner';
import {QrScanner} from '@yudiel/react-qr-scanner';
//import QRCodeScanner from 'react-native-qrcode-scanner';


import '../index.css';

export default function QRScannerCheckin({ setToken }) {
    let { meetingId } = useParams();
    const [studentId, setStudentId] = useState("");

    const [toastList, setToastList] = useState([]);
    let toastProperties = null;
    let color = "";

    const storedToken = getToken();

    const [scanResult, setScanResult] = useState("");
    
    const handleSubmit = async e => {
        e.preventDefault();

        if (studentId.length === 0) {
            toastProperties = {
                id: toastList.length+1,
                title: 'Error',
                description: "Please enter a student ID.",
                type: "error",
                backgroundColor: '#d9534f'                
            };
            setToastList([...toastList, toastProperties]);
            return;
        } 

        const result = await checkinUser({
            login: studentId,
            token: storedToken,
            orgId: sessionStorage.getItem("orgId"),
            meetingId
        });

        setStudentId("");
        if (result.result === "0") {    
            showToast('success', 'User ' + studentId + ' checked in successfully.');
        } 
        else if (result.result === "1") {
            showToast('error', 'User already checked in.');
        }
        else {
            showToast('error', 'Failed to check in user ' + studentId + '.');
        }
    }

    const showQRScanner = async () => {
        
    }
        
    const onNewScanResult = async (code) => {
        // if (result != scanResult) {
            //set form background to green for 1 second


            const response = await checkinByUserToken({
                userToken: code,
                token: storedToken,
                orgId: sessionStorage.getItem("orgId"),
                meetingId
            });

            if (response.result === "0") {
                showToast('success', 'User ' + studentId + ' checked in successfully.');
                console.log(response.result)
            }
            // else {
            //     color = "#ed4647";
            // }

            // document.getElementById("form").style.backgroundColor = color;
            // //turn all the text white
            // document.getElementById("headerTitle").style.color = "white";
            // document.getElementById("idlabel").style.color = "white";
            // document.getElementById("checkoutbutton").style.color = "white";
            // document.getElementById("signupbutton").style.color = "white";
            // document.getElementById("adminloginbutton").style.color = "white";


        
            // setTimeout(function() {
            //     document.getElementById("form").style.backgroundColor = "#f6f6f6";
            //     document.getElementById("headerTitle").style.color = "black";
            //     document.getElementById("idlabel").style.color = "#808080";
            //     document.getElementById("checkoutbutton").style.color = "#0066ff";
            //     document.getElementById("signupbutton").style.color = "#0066ff";
            //     document.getElementById("adminloginbutton").style.color = "#acacac";

            // }, 1000);



        // }


    }
    const showToast = (type, msg) => {
        switch(type) {
          case 'success':
            toastProperties = {
              id: toastList.length+1,
              title: 'Success',
              description: msg,
              backgroundColor: '#0066ff'
            }
            break;
          case 'error':
            toastProperties = {
              id: toastList.length+1,
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
        <div id="form">
            <h2 id="headerTitle">Check In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="row">
                        <label id="idlabel">ID</label>
                        <input type="text" placeholder="Enter your student ID" value={studentId} onChange={e => setStudentId(e.target.value)} />
                    </div>
                    <div id="button" className="row">
                        <button className="check-in">Check In</button>
                    </div>
                    <a href={"/checkout/" + meetingId} className='signupbutton' id="checkoutbutton">Need to check out?</a>
                    <a href="/signup" className='signupbutton' id="signupbutton">Create an account</a>

                    <a href={"/"} className='adminbutton' id="adminloginbutton">Admin Login</a>


                    {/* <div id="scannerdiv">
                    <QrScanner id="scanner" 
                        onDecode={(result) => onNewScanResult(result)}
                        onError={(error) => console.log(error?.message)}
                        scanDelay={2000}
                        constraints={{facingMode: 'user'}}
                    />
                    </div> */}


                </div>
            </form>
            <div >
            <QRCodeScanner 
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
                
                />
            </div>

            <Toast toastlist={toastList} position="top-right" setList={setToastList} />

        </div>
        
    )
}
