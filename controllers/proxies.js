const rp = require('request-promise');


function getEvents(req, res) {
  rp(`http://api.eventful.com/json/events/search?app_key=xZsJsxZbnKn2phn3&where=51.507602,-0.127816&within=10&date=today&page_size=25&sort_order=popularity&include=popularity&offset=${req.params.offset}`)
    .then(data => {
      // console.log(data);
      return res.status(200).json(JSON.parse(data));
    });
}

module.exports = {
  events: getEvents
};
