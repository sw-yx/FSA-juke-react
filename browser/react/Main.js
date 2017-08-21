import React from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'
import AllAlbums from './AllAlbums'
import fakes from './fakealbum'
import axios from 'axios';
import SingleAlbum from './SingleAlbum'

const toJson = response => response.data;
const logError = console.error.bind(console);
const audio = document.createElement('audio');

export default class extends React.Component {
    constructor() {
        super()
        this.state = {
            albums: fakes,
            selectedAlbum : null,
            currentSong: null,
            isPaused: false,
            progress: 0
            }
        this.handleClick = this.handleClick.bind(this)
        this.resetAlbums = this.resetAlbums.bind(this)
        this.audioPlay = this.audioPlay.bind(this)
        this.togglePlay = this.togglePlay.bind(this)
        this.prevOrNextSong = this.prevOrNextSong.bind(this)
    }
    componentDidMount () {
        axios.get('api/albums')
        .then(toJson)
        .then(data => this.setState({albums: data}))
        .catch(logError);
        audio.addEventListener('ended', () => {
            this.prevOrNextSong(true); // or some other way to go to the next song
        });
        audio.addEventListener('timeupdate', () => {
            this.setState({
            progress: 100 * audio.currentTime / audio.duration
            });
        });
    }
    audioPlay (song) {
        audio.src = song.audioUrl;
        audio.load();
        audio.play();
        this.setState({currentSong: song, isPaused: false})
    }

    resetAlbums () {
        this.setState({selectedAlbum: null})
    }
    prevOrNextSong(prevNextToggle) {
        console.log('this.state.currentSong', this.state.currentSong)
        const cursongID = this.state.currentSong.id
        axios.get('/api/songs/' + cursongID)
        .then(data => axios.get('/api/albums/' + data.data.albumId))
        .then(data => {
            const curalbum = data.data
            console.log('curalbum', curalbum)
            const cursongIndex = curalbum.songs.findIndex(x => this.state.currentSong.id == x.id)
            let newSongIndex = prevNextToggle ? cursongIndex + 1 :  cursongIndex - 1
            if (newSongIndex < 0) newSongIndex = curalbum.songs.length - 1
            if (newSongIndex > curalbum.songs.length - 1) newSongIndex = 0
            const newSong = curalbum.songs[newSongIndex]
            audio.src = newSong.audioUrl
            audio.load();
            audio.play();
            this.setState({currentSong: newSong, isPaused: false, progress: 0})     
        })   
        .catch(logError)
    }
    togglePlay () {
        if (!audio.paused) {
            audio.pause()
            this.setState({isPaused: true})
        } else {
            audio.play()
            this.setState({isPaused: false})
        }
    }
    handleClick (obj) {
        axios.get('/api/albums/' + obj.id)
            .then(toJson)
            .then(album => this.setState({selectedAlbum: album}))
    }
    render() {
        return     <div id="main" className="container-fluid">
                    
                    <Sidebar resetAlbums={this.resetAlbums}/>
                    <div className="col-xs-10">
                        {!this.state.selectedAlbum ?
                            <AllAlbums albums={this.state.albums} handleClick={this.handleClick}/> :
                            <SingleAlbum selectedAlbum={this.state.selectedAlbum} currentSong={this.state.currentSong} audioPlay={this.audioPlay}/>
                        }
                    </div>
                    {this.state.currentSong ? 
                        <Footer 
                        currentSong={this.state.currentSong} 
                        isPaused={this.state.isPaused} 
                        togglePlay={this.togglePlay}
                        prevOrNextSong={this.prevOrNextSong}
                        progress = {this.state.progress}
                        /> : <span />}


                    </div>
    }
}