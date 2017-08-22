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

    };
    // this.onChange = this.onChange.bind(this);
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

  handleSubmit () {

  }

  render() {
  const playlist = this.state.selectedPlaylist;

  return (
    <div>
      <h3>{ playlist.name }</h3>
      <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
      { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
      <hr />
      <AddSongForm />
    </div>
    );
  }
}

