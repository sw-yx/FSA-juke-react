import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlayList from './NewPlayList';
import Playlist from './Playlist';
import axios from 'axios';

export default class Main extends Component {
  constructor(){
    super();
    this.state  = {
      allPlayList: []
    }

    axios.get('/api/playlists')
    .then(res => res.data)
    .then(allPlayList => this.setState({allPlayList}));

    this.mainSubmit = this.mainSubmit.bind(this);
  }

  mainSubmit(value) {
    axios.post('/api/playlists', {name: value})
    .then(() => axios.get('/api/playlists'))
    .then(result => {
      this.setState({allPlayList: result.data});
    })
    .catch(console.error);
  }

  render () {
    console.log('this.props', this.props)
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar allPlayList = {this.state.allPlayList} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" render={({match}) => <SingleAlbum {...this.props} match={match}/>} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route path="/playlist/:playlistId" component={Playlist} />
              <Route path="/new-playlist" render={() => <NewPlayList mainSubmit = {this.mainSubmit} />} />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player {...this.props}/>
        </div>
    </Router>
    );
  }
}


              // <Route exact path="/albums" render={() => <StatefulAlbums {...this.props} />} />
              // <Route path="/albums/:albumId" render={() => <SingleAlbum {...this.props} />} />
              // <Route exact path="/artists" render={() => <AllArtists {...this.props} />} />
              // <Route path="/artists/:artistId" render={() => <SingleArtist {...this.props} />} />
              // <Route path="/playlist/:playlistId" render={() => <Playlist {...this.props} />} />
              // <Route path="/new-playlist" render={() => <NewPlayList mainSubmit = {this.mainSubmit} />} />