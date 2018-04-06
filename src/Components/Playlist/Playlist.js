import React from 'react';
import './Playlist.css';
import {PlaylistTrack} from '../PlaylistTrack/PlaylistTrack';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
}
  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
          {
            this.props.playlistTracks.map(track => {
              return <PlaylistTrack track={track} onRemove={this.props.onRemove}/>
            })
          }
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}
