require("dotenv").config();
const keys = require('./keys.js')
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const request = require('request');



const twitterFunction = function () {
  const client = new Twitter(keys.twitter);

  const params = {
    screen_name: 'htngaf'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      for (let i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text + ' tweeted on ' + tweets[i].created_at)
      }
    }
  });

}

const spotifyFunction = function (trackName) {
  const spotify = new Spotify(keys.spotify);

  spotify.search({
    type: 'track',
    query: trackName
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    let songs = data.tracks.items
    for (let i = 0; i < songs.length; i++) {
      console.log(songs[i].artists[0].name + ' - ' + songs[i].name);
    }

  });
}

request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

const liriFunction = function (choice, param) {
  switch (choice) {
    case 'my-tweets':
      twitterFunction();
      break;
    case 'spotify-this-song':
      spotifyFunction(param);
      break;
    default:
      console.log('LIRI does not know that');
  }
}

var userSelection = function (choice, param) {
  liriFunction(choice, param)
}

userSelection(process.argv[2], process.argv[3])