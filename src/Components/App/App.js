import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults : [],
      playlistName : 'New Playlist',
      playlistTracks : [],
      uri : []
    };

    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search =this.search.bind(this);
  }

  addTrack(track){
    let idArr = [];
    for (let i=0; i < this.state.playlistTracks.length; i++){
      idArr.push(this.state.playlistTracks[i].id);
    }
    console.log('track id = '+ track.id);
    if (! idArr.some(x => x === track.id)){
      let a = this.state.playlistTracks;
      a.push(track);
      console.log(a);
      this.setState({playlistTracks: a});
    }
  }

  removeTrack(track){
    const a = this.state.playlistTracks;
    //filter each object
    let filteredList = a.filter(a => {
      return a.id !== track.id;
    });
    this.setState({playlistTracks: filteredList});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

savePlaylist (){
  let uriArr = [];
  let playlistId = '';
  let playlistName = this.state.playlistName;
  for (let i=0; i < this.state.playlistTracks.length; i++){
    uriArr.push(this.state.playlistTracks[i].uri);
  }
  console.log('savePlaylist uri'+uriArr);
  console.log('savePlaylist name1='+playlistName);
  Spotify.savePlaylist(uriArr, playlistName);
}

search(term){
  Spotify.search(term).then(tracks => {
    this.setState({searchResults: tracks});
  });
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              />
          </div>
        </div>
      </div>
    );
  }
}
