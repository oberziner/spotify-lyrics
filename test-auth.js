'use strict';

const axios = require('axios');
const querystring = require('querystring');

const loginSpotify = () => {
  let data = '375d23148c164a36a61d5e966358460e:35727aaeb176478580e99b310fa95d06';
  let buff = new Buffer(data);
  let base64data = buff.toString('base64');

  console.log('"' + data + '" converted to Base64 is "' + base64data + '"');

  console.log('h2i');

  const params = querystring.stringify({'grant_type': 'client_credentials'});
  axios.post('https://accounts.spotify.com/api/token', params, {
    headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + base64data}
  })
    .then(res => console.log(res))
    .catch(error => {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    })

}

const loginGenius = () => {
  let data = 'pZfEtse85D1W3ghR1hJxJsk5oPtWOmkgenPPRnFmdYtahtLA8XyJrCJ9I2kuoI-K:-2_mUlcQoBZsrfBQilFJvj4IE0YWnAhs0Qw35ZvROf8D36uxyaeV5xxGUvmwiuqv0FZaVBBE68uJiWlkmvfdlw';
  let buff = new Buffer(data);
  let base64data = buff.toString('base64');

  console.log('"' + data + '" converted to Base64 is "' + base64data + '"');

  console.log('h2i');

  const params = querystring.stringify({'grant_type': 'client_credentials'});
  axios.post('https://api.genius.com/oauth/token', params, {
    headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + base64data}
  })
    .then(res => {
      console.log(res.data.access_token)
      axios.get('https://api.genius.com/search?q=Pink Floyd Dogs', {
        headers: {'Authorization': 'Bearer ' + res.data.access_token}
      })
        .then(res => {
          console.log(res.data)
        })

    })
    .catch(error => {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    })

}

//loginSpotify();
loginGenius();
