
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
   
export async function getReportByDate(startDate, endDate) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/reportbydate?startDate=' + startDateStr + '&endDate=' + endDateStr)
        .then(data => data.json())
}

export async function getTopAttendees(startDate, endDate, limit) {
    let startDateStr = startDate.toISOString().substring(0, 10);
    let endDateStr = endDate.toISOString().substring(0, 10);
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/topattendees?startDate=' + startDateStr + '&endDate=' + endDateStr + '&limit=' + limit)
        .then(data => data.json())
}
