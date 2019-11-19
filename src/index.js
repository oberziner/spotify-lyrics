import './main.css';

//const url = 'http://localhost:8080'
const url = 'https://oberziner.github.io/spotify-lyrics'
const geniusToken = sessionStorage.getItem('geniusToken');
const spotifyToken = sessionStorage.getItem('spotifyToken');

if (spotifyToken) {
  fetch('https://api.spotify.com/v1/me/player', {
    headers: {'Authorization': 'Bearer ' + spotifyToken}
  }).then((response) => {
    return response.json();
  }).then((data) => {
    const play = data;
    document.getElementById('album').innerText = play.item.album.name;
    document.getElementById('artist').innerText = play.item.artists[0].name;
    document.getElementById('track').innerText = play.item.name;
    getLyric();
  })

} else {
  if (window.location.hash.length == 0) {
    window.location.replace('https://accounts.spotify.com/authorize?client_id=375d23148c164a36a61d5e966358460e&redirect_uri=' + url + '&scope=user-read-recently-played user-read-private%20user-read-email&response_type=token')
  } else {
    const token = window.location.hash.split('#')[1].split('&')[0].split('=')[1];
    sessionStorage.setItem('spotifyToken', token);
    window.location.replace(url)
  }
}

const getLyric = () => {
  if (geniusToken) {
    let trackName = document.getElementById('track').innerText;
    if (trackName.indexOf('- Remastered') > 0) {
      trackName = trackName.substring(0, trackName.indexOf('- Remastered'));
    }
    const search = document.getElementById('artist').innerText + " " + trackName;
    document.getElementById('lyricSearch').innerText = "Lyric search: " + search;
    if (search.length > 0) {
      fetch('https://api.genius.com/search?q=' + encodeURI(search) + '&access_token=' + geniusToken)
        .then((response) => {
          return response.json();
        }).then((data) => {
          const lyr = data;
          const topLyric = lyr.response.hits[0].result;
          document.getElementById('topLyric').innerText = "Lyric found: " + topLyric.full_title + ' - ' + topLyric.url;
          document.getElementById('lyric').innerText = lyr.response.hits.map(hit => {
            return hit.result.full_title + hit.result.url + '\n';
          })
          fetchLyricPage(lyr.response.hits[0])
        })
    } else {
      document.getElementById('lyric').innerText = 'genius' + search; 
    }
  } else {
    if (window.location.hash.length == 0) {
      window.location.replace('https://api.genius.com/oauth/authorize?client_id=pZfEtse85D1W3ghR1hJxJsk5oPtWOmkgenPPRnFmdYtahtLA8XyJrCJ9I2kuoI-K&redirect_uri=' + url + '&scope=&response_type=token')
    } else {
      const token = window.location.hash.split('#')[1].split('&')[0].split('=')[1];
      sessionStorage.setItem('geniusToken', token);
      window.location.replace(url)
    }
  }

}

const fetchLyricPage = (hit) => {
  const srci = '<div id="rg_embed_link_' + hit.result.id + '" class="rg_embed_link" data-song-id="' + hit.result.id + '">Read <a href="https://genius.com/Joy-division-love-will-tear-us-apart-lyrics">“Love Will Tear Us Apart” by Joy Division</a> on Genius</div> <script crossorigin src="//genius.com/songs/' + hit.result.id + '/embed.js"></script>'
  console.log(srci)
  document.getElementById('lyrictext').innerHTML =  '<iframe width="100%" height=' + window.innerHeight * 0.7+ 'px style="border:none" srcdoc=\'' + srci + '\'> </iframe>';

}

  /*const fetchLyricPage = (hit) => {
  fetch('https://genius.com/songs/' + hit.result.id + '/embed.js').then(res => {
    return res.text();
  }).then(res => {
    //    document.getElementById('lyrictext').innerHTML = '<div id="rg_embed_link_' + hit.result.id + '" class="rg_embed_link" data-song-id="' + hit.result.id + '">Read <a href="https://genius.com/Joy-division-love-will-tear-us-apart-lyrics">“Love Will Tear Us Apart” by Joy Division</a> on Genius</div> <script crossorigin src="//genius.com/songs/' + hit.result.id + '/embed.js"></script>'
    document.getElementById('lyrictext').innerText = res;

  })
}
  */
