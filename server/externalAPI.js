const calendar = function (startDate,dueDate, todo,email) {
  // Refer to the Node.js quickstart on how to setup the environment:
  // https://developers.google.com/calendar/quickstart/node
  // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
  // stored credentials.

  var event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': startDate,
      'timeZone': 'Asia/Jakarta',
    },
    'end': {
      'dateTime': dueDate,
      'timeZone': 'Asia/Jakarta',
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 24 * 60 },
        { 'method': 'popup', 'minutes': 10 },
      ],
    }
  };

  calendar.events.insert({
    auth: auth,
    calendarId: email,
    resource: event,
  }, function (err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
}

module.exports = calendar