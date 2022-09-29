
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

export async function getMeetings() {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/meetings')
        .then(data => data.json())
}

export async function getRecentMeetings(limit) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/recentmeetings?limit=' + limit)
        .then(data => data.json())
}

export async function startMeeting(meetingData) {
    console.log("startMeeting: ", meetingData);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/startmeeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(meetingData)
    })
        .then(data => data.json())
}

export async function getMeeting(meetingId) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/meeting?meetingId=' + meetingId)
        .then(data => data.json())
}

export async function closeMeeting(meetingData) {
    console.log("closeMeeting: ", meetingData);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/closemeeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(meetingData)
    })
        .then(data => data.json())
}

export async function getAttendees(meetingId) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/attendees?meetingId=' + meetingId)
        .then(data => data.json())
}

export async function getAttendance(userId, startDate, endDate) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    console.log("getAttendance: ", userId, startDate, endDate);

    return fetch(process.env.REACT_APP_API_URL + '/rbapi/attendance?userId=' + userId + '&startDate=' + startDateStr + '&endDate=' + endDateStr)
        .then(data => data.json())

    
}

export async function getPercentages(userId, startDate, endDate) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/percentages?userId=' + userId + '&startDate=' + startDateStr + '&endDate=' + endDateStr)
        .then(data => data.json())
}

export async function getUser(userId) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/user?userId=' + userId)
        .then(data => data.json())
}

export async function getUserByLogin(login) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/userbylogin?login=' + login)
        .then(data => data.json())
}

export async function addUser(userData) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/adduser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(data => data.json())
}

export async function updateUser(userData) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/updateuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(data => data.json())
}


export async function getUsers() {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/users')
        .then(data => data.json())
}

export async function checkinUser(checkinDetails) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/checkin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkinDetails)
    })
        .then(data => data.json())
}

export async function checkoutUser(checkoutDetails) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutDetails)
    })
        .then(data => data.json())
}

export async function registerUser(userDetails) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
      .then(data => data.json())
}

export async function passwordReset(userDetails) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/passwordreset', {
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
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/reportbydate?startDate=' + startDateStr + '&endDate=' + endDateStr)
        .then(data => data.json())
}

export async function getRawDataByDate(startDate, endDate) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/rawdatabydate?startDate=' + startDateStr + '&endDate=' + endDateStr)
        .then(data => data.json())
}

export async function getTopAttendees(startDate, endDate, limit) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/topattendees?startDate=' + startDateStr + '&endDate=' + endDateStr + '&limit=' + limit)
        .then(data => data.json())
}

