// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = 'efe041e9ce724a73a97b96eb8cf5a173';
const redirectUri = 'http://ricky-playlist.surge.sh/';
const scopes =
'playlist-read-private%20playlist-modify-private%20user-read-private%20user-read-email';

// If there is no token, redirect to Spotify authorization
if (!_token) {

  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;
  console.log('_token:'+window.location)
}



const Spotify = {//1
  search(term){
    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track&market=US&limit=20&offset=5`, {
      headers: {
        Authorization: `Bearer ${_token}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks){
        console.log(jsonResponse.tracks);
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    });
  },
  savePlaylist(uriArr, playlistName){
    //get userId
    let userId = '';
    fetch('https://api.spotify.com/v1/me', //get id
    {headers: {
      Authorization: `Bearer ${_token}`
    }
  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
    if (jsonResponse.id){
      console.log('jsonResponse.userid 1 ='+jsonResponse.id);
      userId = jsonResponse.id;
      //get playlistId
      let playlistId = '';
      console.log('playlist name='+playlistName);
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {method: 'POST',
          headers:   {Authorization: `Bearer ${_token}`},
          body: JSON.stringify({name: playlistName})
        }).then(response =>{
          return response.json();
        }).then(jsonResponse  => {
          if (jsonResponse.id){
            console.log('jsonResponse.playlistId='+jsonResponse.id);
            playlistId = jsonResponse.id;
            //add tracks
            fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks?position=0&uris=${uriArr}`,
              {method: 'POST',
                headers:   {Authorization: `Bearer ${_token}`}
              }).then(response =>{
                return response.json();
              });
            }});
          }});
        }
      };

      export default Spotify;
