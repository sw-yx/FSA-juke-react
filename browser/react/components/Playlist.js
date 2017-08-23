import React from 'react';
import { Link } from 'react-router-dom';
import Songs from '../components/Songs';
import AddSongForm from '../components/AddSongForm';
import axios from 'axios';

export default class Playlist extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedPlaylist: [],
      errorMsg: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getPlaylist (playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
    .then(res => res.data)
    .then(selectedPlaylist => this.setState({ selectedPlaylist }));
  }

  componentDidMount () {
    const playlistId = this.props.match.params.playlistId;
    this.getPlaylist(playlistId);
  }

  componentWillReceiveProps (nextProps) {
    const playlistId = this.props.match.params.playlistId;
    const nextplaylistId = nextProps.match.params.playlistId;
    if (playlistId !== nextplaylistId) this.getPlaylist(nextplaylistId);
  }

  handleSubmit (value) {
    const playlistId = this.props.match.params.playlistId;
    axios.post(`/api/playlists/${playlistId}/songs`, {id: value})
    .then(() => axios.get(`/api/playlists/${playlistId}`))
    .then(result => {
      this.setState({selectedPlaylist: result.data, errorMsg: null});
    })
    .catch((error) => this.setState({errorMsg: error.response.data}));
  }

  render() {
  const playlist = this.state.selectedPlaylist;
  const nameWarning = (this.state.errorMsg) ?
    <div className="alert alert-warning">{this.state.errorMsg}</div> :
    <div></div>
  return (
    <div>
      <h3>{ playlist.name }</h3>
      <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
      { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
      <hr />
      {nameWarning}
      <AddSongForm handleSubmit = {this.handleSubmit} />
    </div>
    );
  }
}

