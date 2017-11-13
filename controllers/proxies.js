const rp = require('request-promise');

function getEvents(req, res) {
  rp('https://www.skiddle.com/api/v1/events/search/?api_key=5f672bea4d616563d430e9436703e9b9&limit=100&LIVE&FEST&CLUB&THEATRE&COMEDY&SPORT&latitude=51.507602&longitude=-0.127816&radius=5&order=goingto')
    .then(data => {
      return res.status(200).json(JSON.parse(data));
    });
}

module.exports = {
  events: getEvents
};
