import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AddSongForm extends Component {
  constructor() {
    super()
    this.state = {
      selectedSong: 1,
      allSongs: []
    };

    axios.get('/api/songs/').then((data) => {
      this.setState({allSongs: data.data})})

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({selectedSong: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.selectedSong);
  }

  render() {
    return (
      <div className="well">
      <form className="form-horizontal" noValidate name="songSelect" onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Add to Playlist</legend>
          <div className="form-group">
            <label htmlFor="song" className="col-xs-2 control-label">Song</label>
            <div className="col-xs-10">
              <select className="form-control" name="song" onChange={this.onChange}>
                {this.state.allSongs.map(song => <option value={song.id} key={song.id}>{song.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button type="submit" className="btn btn-success">Add Song</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    );
  }
}

