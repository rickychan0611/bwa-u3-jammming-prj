import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    //this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*search(){
    this.props.onSearch(this.props.search); //term? pass to app.js
  }*/

handleTermChange(event){
  this.setState({value: event.target.value});
  //this.props.onSearch(event.target.value);
}

handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    this.props.onSearch(this.state.value);
    event.preventDefault();
    }

  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={this.handleSubmit}>
        <input placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}/><br />
        <input className="a" type="submit" value="Submit" />
        {/*<a type="submit">SEARCH</a>*/}
        </form>
      </div>
    );
  }
}
