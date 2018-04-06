import React from 'react';
import './PlaylistTrack.css';

export class PlaylistTrack extends React.Component {
  constructor(props){
    super(props);
    this.removeTrack=this.removeTrack.bind(this);

  }


  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" onClick={this.removeTrack}>-</a>
      </div>
    );
  }
}
