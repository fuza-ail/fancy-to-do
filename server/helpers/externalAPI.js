require('dotenv').config();

const { google } = require('googleapis');
const { OAuth2 } = google.auth

function addToCalendar(startDate,endDate,todo,description, email){
  const oAuth2Client = new OAuth2(process.env.ClientId,process.env.ClientSecret)

  oAuth2Client.setCredentials({ refresh_token: process.env.token })
  
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  
  const event = {
    summary: todo,
    location: 'Jakarta',
    description: description,
    start: {
      dateTime: startDate,
      timeZone: 'Asia/Jakarta'
    },
    end: {
      dateTime: endDate,
      timeZone: 'Asia/Jakarta'
    }
  }
  
  calendar.freebusy.query({
    resource: {
      timeMin: startDate,
      timeMax: endDate,
      timeZone: 'Asia/Jakarta',
      items: [{ id: email }]
    }
  }, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      // const eventsArray = res.data.calendars.primary.busy
      calendar.events.insert({ calendarId: email, resource: event }, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('calendar created')
        }
      })
  
    }
  })
}

module.exports = addToCalendar