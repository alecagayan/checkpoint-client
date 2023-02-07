import { getToken } from "./App";

export async function getWithToken(url) {
    const request = {
            method: 'GET',
            headers: { 'X-Auth-Token': getToken() }
        };

    return fetch(url, request)
        .then(data => data.json())
}

export async function postWithToken(url, data) {
    const request = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Auth-Token': getToken() 
            }
        };

    if (data)  {
        request.body = JSON.stringify(data);
    } 

    return fetch(url, request)
        .then(data => data.json())
}

export async function loginUser(credentials) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

/*
export async function getMeetings() { 
    console.log("token: " + getToken());
    //replace all getToken plus characters with %2b
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/meetings?token=' + getToken().replace(/\+/g, '%2b'))
        .then(data => data.json())
}
*/

export async function getMeetings() { 
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/meetings')
}

export async function getMeetingTypes() {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/meetingtypes')
}   

export async function getMeetingsWithType(meetingTypeId) {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/meetingswithtype?meetingTypeId=' + meetingTypeId)
}

export async function getRecentMeetings(limit) {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/recentmeetings?limit=' + limit)
}

export async function startMeeting(meetingData) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/startmeeting', meetingData)
}

export async function getMeeting(meetingId) {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/meeting?meetingId=' + meetingId)
}

export async function getMeetingType(meetingTypeId) {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/meetingtype?meetingTypeId=' + meetingTypeId)
}

export async function closeMeeting(meetingData) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/closemeeting', meetingData)
}

export async function changeMeetingType(meetingData) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/changemeetingtype', meetingData)
}

export async function getAttendees(meetingId) {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/attendees?meetingId=' + meetingId)
}

export async function getAttendance(userId) {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/attendance?userId=' + userId)
}

export async function getAttendanceByToken() {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/attendancebytoken')
}

export async function getAttendanceBetweenDates(userId, startDate, endDate) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/attendance?userId=' + userId + '&startDate=' + startDateStr + '&endDate=' + endDateStr)
        .then(data => data.json())
}

export async function getAttendanceByTokenBetweenDates(startDate, endDate) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/attendancebytokenbetweendates?startDate=' + startDateStr + '&endDate=' + endDateStr)
}
export async function getPercentages(userId, startDate, endDate) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/percentages?userId=' + userId + '&startDate=' + startDateStr + '&endDate=' + endDateStr)
        .then(data => data.json())
}

export async function getPercentagesByTokenBetweenDates(startDate, endDate) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/percentagesbytokenbetweendates?startDate=' + startDateStr + '&endDate=' + endDateStr)
}

export async function getUser(userId) {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/user?userId=' + userId)
}

export async function getUserByLogin(login) {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/userbylogin?login=' + login)
}

export async function getUserByToken() {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/userbytoken')
}

export async function addUser(userData) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/adduser', userData)
}

export async function updateUser(userData) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/updateuser', userData)
}

export async function addMeetingType(userData) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/addmeetingtype', userData)
}

export async function updateMeetingType(meetingTypeData) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/updatemeetingtype', meetingTypeData)
}

export async function getUsers() {
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/users')
}

export async function checkinUser(checkinDetails) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/checkin', checkinDetails)
}

export async function checkinByUserToken(checkinDetails) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/checkinbyusertoken', checkinDetails)
}

export async function checkoutUser(checkoutDetails) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/checkout', checkoutDetails)
}

export async function registerUser(userDetails) {
    return postWithToken(process.env.REACT_APP_API_URL + '/rbapi/register', userDetails)
}

export async function registerOrganization(orgDetails) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/registerorg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orgDetails)
    })
      .then(data => data.json())
}

export async function forgotPassword(userDetails) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/forgotpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
      .then(data => data.json())
}

export async function resetPassword(userDetails) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/resetpassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
    })
        .then(data => data.json())
}
   
export async function getReportByDate(startDate, endDate) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/reportbydate?startDate=' + startDateStr + '&endDate=' + endDateStr)
}

export async function getRawDataByDate(startDate, endDate) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/rawdatabydate?startDate=' + startDateStr + '&endDate=' + endDateStr)
}

export async function getTopAttendees(startDate, endDate, limit, type) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return getWithToken(process.env.REACT_APP_API_URL + '/rbapi/topattendees?startDate=' + startDateStr + '&endDate=' + endDateStr + '&limit=' + limit + '&type=' + type)
}

